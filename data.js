import fs from "fs";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import axios from "axios";
import readlineSync from "readline-sync";

const inputFilePath = "data.txt";
const outputFilePath = "src/data.json";
const TMDB_API_KEY = "17c4c503dd81066a03b81f929664e9de"; // Replace with your TMDb API key
const TMDB_API_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const TMDB_KEYWORDS_URL = "https://api.themoviedb.org/3/movie/";

async function fetchMovieIdBynameAndYear(name, year) {
  try {
    const response = await axios.get(TMDB_SEARCH_URL, {
      params: {
        api_key: TMDB_API_KEY,
        query: name,
        year: year,
      },
    });
    const results = response.data.results;
    if (results.length > 0) {
      return results[0].id;
    } else {
      console.warn(`No TMDb ID found for movie: ${name} (${year})`);
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching TMDb ID for movie: ${name} (${year}):`,
      error
    );
    return null;
  }
}

async function fetchMovieDetails(movieId) {
  if (!movieId) {
    console.error("Error: movieId is undefined");
    return null;
  }

  try {
    const response = await axios.get(`${TMDB_API_URL}${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching movie details for movieId ${movieId}:`,
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

async function fetchMovieKeywords(movieId) {
  if (!movieId) {
    console.error("Error: movieId is undefined");
    return [];
  }

  try {
    const response = await axios.get(
      `${TMDB_KEYWORDS_URL}${movieId}/keywords`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );
    return response.data.keywords.map((keyword) => keyword.name);
  } catch (error) {
    console.error(
      `Error fetching keywords for movieId ${movieId}:`,
      error.response ? error.response.data : error.message
    );
    return [];
  }
}

async function processFile() {
  if (!fs.existsSync(inputFilePath)) {
    console.error("Error: No data.txt file found. Program will exit.");
    process.exit(1);
  }

  // Check if data.json exists and ask the user if they want to fetch again
  if (fs.existsSync(outputFilePath)) {
    const answer = readlineSync.question(
      "data.json already exists. Do you want to fetch data again? (y/n): "
    );
    if (answer.toLowerCase() !== "y") {
      console.log("Exiting program.");
      process.exit(0);
    }
  }

  const startTime = Date.now();

  const fileStream = createReadStream(inputFilePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let objects = [];
  const seenUuids = new Set();

  for await (const line of rl) {
    if (line.trim()) {
      try {
        const jsonObject = JSON.parse(line);
        if (jsonObject.data && jsonObject.data.objects) {
          jsonObject.data.objects.forEach((obj) => {
            if (!seenUuids.has(obj.uuid)) {
              seenUuids.add(obj.uuid);
              objects.push(obj);
            }
          });
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }

  console.log(`Total movies to process: ${objects.length}`);

  let genresSet = new Set();
  let seriesSet = new Set();
  let keywordsSet = new Set();
  let languagesSet = new Set();
  let minYear = Infinity,
    maxYear = -Infinity;
  let minRuntime = Infinity,
    maxRuntime = -Infinity;
  let counts = { watchlist: 0, upcoming: 0, watched: 0 };

  let processedCount = 0;

  for (const obj of objects) {
    const name = obj.meta.name;
    const year = new Date(obj.meta.first_release_date).getFullYear();

    if (!name || !year) {
      continue;
    }

    const movieId = await fetchMovieIdBynameAndYear(name, year);
    if (!movieId) {
      continue;
    }

    const movieDetails = await fetchMovieDetails(movieId);
    let keywords = [];
    if (movieDetails) {
      keywords = await fetchMovieKeywords(movieId);

      obj.meta.series_info = movieDetails.belongs_to_collection
        ? {
            series_name: movieDetails.belongs_to_collection.name,
            series_id: movieDetails.belongs_to_collection.id,
          }
        : null;
      if (movieDetails.belongs_to_collection) {
        seriesSet.add(movieDetails.belongs_to_collection.name);
      }

      obj.meta.keywords = keywords;
      keywords.forEach((keyword) => keywordsSet.add(keyword));

      obj.meta.original_language = movieDetails.original_language || null;
      if (movieDetails.original_language) {
        languagesSet.add(movieDetails.original_language);
      }

      if (obj.meta.genres) {
        obj.meta.genres.forEach((genre) => genresSet.add(genre));
      }
      if (!isNaN(year)) {
        minYear = Math.min(minYear, year);
        maxYear = Math.max(maxYear, year);
      }
      const runtimeMinutes = obj.meta.runtime / 60;
      if (!isNaN(runtimeMinutes)) {
        minRuntime = Math.min(minRuntime, runtimeMinutes);
        maxRuntime = Math.max(maxRuntime, runtimeMinutes);
      }
      if (
        !obj.extended.is_watched &&
        obj.meta.is_released &&
        obj.meta.runtime > 0
      ) {
        counts.watchlist++;
      }
      if (!obj.meta.is_released || obj.meta.runtime === 0) {
        counts.upcoming++;
      }
      if (obj.extended.is_watched) {
        counts.watched++;
      }
    } else {
      console.warn(
        `Warning: Could not retrieve details for ${name} (${year})`
      );
      obj.meta.series_info = null;
      obj.meta.keywords = [];
      obj.meta.original_language = null;
    }

    // Remove unnecessary fields from meta and extended
    delete obj.meta.character_order;
    delete obj.meta.characters;
    delete obj.meta.created_at;
    delete obj.meta.external_sources;
    delete obj.meta.filter;
    delete obj.meta.follower_count;
    delete obj.meta.franchise;
    delete obj.meta.position_in_franchise;
    delete obj.meta.sorting;
    delete obj.meta.status;
    delete obj.meta.tagline;
    delete obj.meta.translations;
    delete obj.filter;
    delete obj.sorting;
    delete obj.created_at;
    delete obj.updated_at;
    delete obj.watched_at;

    processedCount++;
    process.stdout.write(
      `\rProcessed ${processedCount} out of ${objects.length} movies. ${
        objects.length - processedCount
      } left to process.`
    );
  }

  console.log(`\nTotal movies processed: ${processedCount}`);

  const endTime = Date.now();
  const fetchDuration = (endTime - startTime) / 1000;

  const finalData = {
    data: {
      last_updated: new Date().toISOString().slice(0, 10),
      fetch_duration: `${Math.floor(
        fetchDuration / 60
      )} minutes and ${Math.floor(fetchDuration % 60)} seconds`,
      genres: Array.from(genresSet),
      series: Array.from(seriesSet),
      keywords: Array.from(keywordsSet),
      languages: Array.from(languagesSet),
      years: [minYear, maxYear],
      runtimes: [minRuntime, maxRuntime],
      counts: counts,
      objects: objects,
    },
  };

  const tempFilePath = "temp_data.json";
  fs.writeFileSync(tempFilePath, JSON.stringify(finalData, null, 2));

  if (fs.existsSync(tempFilePath)) {
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
    fs.renameSync(tempFilePath, outputFilePath);
    console.log("data.json file created successfully.");
  } else {
    console.error("Failed to create the temporary data file.");
  }

  console.log(`Time taken to process file: ${finalData.data.fetch_duration}`);
}

processFile().catch(console.error);
