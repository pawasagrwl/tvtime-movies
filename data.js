import fs from "fs";
import readline from "readline";
import { createReadStream } from "fs";
import { createInterface } from "readline";

const inputFilePath = "data.txt";
const outputFilePath = "src/data.json";

async function processFile() {
  // Check if data.txt exists
  if (!fs.existsSync(inputFilePath)) {
    console.error("Error: No data.txt file found. Program will exit.");
    process.exit(1); // Exit the program
  }

  const fileStream = createReadStream(inputFilePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let objects = [];
  const seenUuids = new Set();

  // Collect unique objects
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

  let genresSet = new Set();
  let minYear = Infinity,
    maxYear = -Infinity;
  let minRuntime = Infinity,
    maxRuntime = -Infinity;
  let counts = { watchlist: 0, upcoming: 0, watched: 0 };

  // Process unique objects for additional data
  for (const obj of objects) {
    // Update genres
    if (obj.meta.genres) {
      obj.meta.genres.forEach((genre) => genresSet.add(genre));
    }
    // Update years
    const year = new Date(obj.meta.first_release_date).getFullYear();
    if (!isNaN(year)) {
      minYear = Math.min(minYear, year);
      maxYear = Math.max(maxYear, year);
    }
    // Update runtime
    const runtimeMinutes = obj.meta.runtime / 60; // Assuming runtime is in seconds
    if (!isNaN(runtimeMinutes)) {
      minRuntime = Math.min(minRuntime, runtimeMinutes);
      maxRuntime = Math.max(maxRuntime, runtimeMinutes);
    }

    // Update counts based on the criteria
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
  }

  const finalData = {
    data: {
      last_updated: new Date().toISOString().slice(0, 10), // Format as "YYYY-MM-DD"
      genres: Array.from(genresSet),
      years: [minYear, maxYear],
      runtimes: [minRuntime, maxRuntime],
      counts: counts,
      objects: objects,
    },
  };

  // Write the new data to a temporary file first
  const tempFilePath = "temp_data.json";
  fs.writeFileSync(tempFilePath, JSON.stringify(finalData, null, 2));

  // If successful, delete the old data.json file and rename the temporary file
  if (fs.existsSync(tempFilePath)) {
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
    fs.renameSync(tempFilePath, outputFilePath);
    console.log("data.json file created successfully.");
  } else {
    console.error("Failed to create the temporary data file.");
  }
}

processFile().catch(console.error);
