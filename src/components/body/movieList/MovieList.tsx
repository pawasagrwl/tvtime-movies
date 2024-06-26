import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import data from "../../../data.json";
import { Movie, MovieListProps } from "../../../types/types";

const MovieList: React.FC<MovieListProps> = ({ filter, sort }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const movieData = data.data.objects as Movie[];
      setMovies(movieData);
      setLoading(false);
    } catch (error) {
      setError("Failed to load data");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const filteredMovies = movies.filter(filter);

  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sort.criteria === "name") {
      return sort.order === "asc"
        ? a.meta.name.localeCompare(b.meta.name)
        : b.meta.name.localeCompare(a.meta.name);
    } else if (sort.criteria === "releaseDate") {
      return sort.order === "asc"
        ? new Date(a.meta.first_release_date).getTime() -
            new Date(b.meta.first_release_date).getTime()
        : new Date(b.meta.first_release_date).getTime() -
            new Date(a.meta.first_release_date).getTime();
    } else if (sort.criteria === "runtime") {
      return sort.order === "asc"
        ? a.meta.runtime - b.meta.runtime
        : b.meta.runtime - a.meta.runtime;
    }
    return 0;
  });

  return (
    <Grid container spacing={0.1}>
      {sortedMovies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.uuid}>
          <MovieItem
            uuid={movie.uuid}
            name={movie.meta.name}
            releaseDate={movie.meta.first_release_date}
            runtime={movie.meta.runtime}
            posterUrl={movie.meta.posters[0]?.url}
            genres={movie.meta.genres}
            overview={movie.meta.overview}
            trailers={movie.meta.trailers}
            meta={movie.meta}
            extended={movie.extended}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
