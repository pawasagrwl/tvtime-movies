import axios from 'axios';

const TMDB_API_KEY = '17c4c503dd81066a03b81f929664e9de'; // Replace with your TMDb API key
const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';

async function fetchMovieIdByTitle(title) {
  try {
    const response = await axios.get(TMDB_SEARCH_URL, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      console.log(`Found movie: ${results[0].title} (ID: ${results[0].id})`);
    } else {
      console.log(`No results found for title: ${title}`);
    }
  } catch (error) {
    console.error(`Error fetching movie details for title "${title}":`, error.response ? error.response.data : error.message);
  }
}

const testTitle = 'Inception'; // Replace with any movie title you want to test
fetchMovieIdByTitle(testTitle);
