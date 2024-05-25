# TV Time Movies

## Purpose

TV Time Movies is a React 18 TypeScript application designed to organize and display movies with search, filter, and sort functionalities. It uses data manually extracted from TV Time.

GitHub Pages Hosting: [TV Time Movies](https://pawasagrwl.github.io/tvtime-movies/)

*Disclaimer: This app is not for tracking your movie watchlist and does not connect with TV Time in any way. You need an existing account with TV Time and movies added to your account watchlist to extract the data and run this web app.*

## Features

- Organizable movie list
- Search functionality
- Filter movies by genre, year, runtime.
- Sort movies by name, release date, runtime.
- Sticky header and footer for easy navigation.

## How to Put Data

### Step 1: Making `data.txt`

1. Open [TV Time Desktop App](https://app.tvtime.com) and log in.
2. Open the network inspection tool in your browser.
3. Navigate to the "Profile" tab and let all movies load.
4. In the network inspection tool, search for "tracking/cgw/follows/user".
5. Copy the raw response from every URL in that search and paste it into a file called `data.txt`.

### Step 2: Making `data.json`

1. Place `data.txt` in the main directory (outside the `src` folder).
2. Run `data.js` to convert `data.txt` into `data.json`. This will create `data.json` in the `src/` directory.

## Format of `data.json`

Here's an example structure for `data.json`. Each object in the list should follow this format. Genres are shown as a list of strings.

```json
{
  "data": {
    "last_updated": "YYYY-MM-DD",
    "genres": string[],
    "years": [
      EARLIEST_YEAR,
      LATEST_YEAR
    ],
    "runtimes": [
      MIN_RUNTIME,
      MAX_RUNTIME
    ],
    "counts": {
      "watchlist": NUMBER,
      "upcoming": NUMBER,
      "watched": NUMBER
    },
    "objects": [
      {
        "uuid": "UNIQUE_IDENTIFIER",
        "type": "follow",
        "entity_type": "movie",
        "created_at": "TIMESTAMP",
        "updated_at": "TIMESTAMP",
        "watched_at": "TIMESTAMP",
        "meta": {
          "character_order": "",
          "characters": [],
          "created_at": "TIMESTAMP",
          "external_sources": [
            {
              "id": "ID",
              "source": "SOURCE_NAME",
              "type": "external_source"
            }
          ],
          "fanart": [
            {
              "comment": "",
              "favorite_count": NUMBER,
              "height": NUMBER,
              "lang": "LANGUAGE_CODE",
              "thumb_url": "URL",
              "type": "fanart",
              "url": "URL",
              "uuid": "UUID",
              "width": NUMBER
            }
          ],
          "filter": [],
          "first_release_date": "DATE",
          "follower_count": NUMBER,
          "franchise": {
            "name": "",
            "type": "franchise",
            "uuid": ""
          },
          "genres": [
            "GENRE1",
            "GENRE2",
            "GENRE3"
          ],
          "is_released": true,
          "language": "LANGUAGE_CODE",
          "name": "MOVIE_TITLE",
          "overview": "MOVIE_OVERVIEW",
          "position_in_franchise": NUMBER,
          "posters": [
            {
              "comment": "",
              "favorite_count": NUMBER,
              "height": NUMBER,
              "lang": "LANGUAGE_CODE",
              "thumb_url": "URL",
              "type": "poster",
              "url": "URL",
              "uuid": "UUID",
              "width": NUMBER
            }
          ],
          "release_dates": [],
          "runtime": NUMBER,
          "sorting": null,
          "status": "",
          "tagline": "",
          "trailers": [],
          "translations": [],
          "type": "movie",
          "updated_at": "TIMESTAMP",
          "uuid": "UUID"
        },
        "extended": {
          "rating_count": NUMBER,
          "rating": NUMBER,
          "comment_count": NUMBER,
          "follower_count": NUMBER,
          "is_watched": BOOLEAN
        },
        "filter": [
          "FILTER_TYPE"
        ],
        "sorting": [
          {
            "value": "VALUE",
            "id": "ID"
          },
          {
            "value": "VALUE",
            "id": "ID"
          },
          {
            "value": "VALUE",
            "id": "ID"
          }
        ]
      }
    ]
  }
}
```

## How to Run

1. Clone the repository:

   ```sh
   git clone [repository link]
   cd tvtime-movies
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```
3. Create `data.json` in the above format using `data.js ` as written above.

4. Start the development server:

   ```sh
   npm run dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

The application should now be running, and you can start organizing and viewing your movies.

## How It's Made

TV Time Movies is built using React 18 and TypeScript, providing a robust and type-safe environment for development. The app is created using Vite, which offers fast and optimized build processes. The UI design closely follows a provided image, ensuring a clean and user-friendly interface. The project is hosted on GitHub Pages, making it easily accessible.

By following the instructions above, you can manage your movie data and explore the functionalities of TV Time Movies, enhancing your movie-watching experience.
