import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import data from '../data.json';

interface Movie {
  uuid: string;
  meta: {
    name: string;
    first_release_date: string;
    runtime: number;
    posters: { url: string }[];
    genres: string[];
  };
  extended: {
    is_watched: boolean;
  };
}

interface MovieListProps {
  filter: (movie: Movie) => boolean;
  sort: { criteria: string; order: 'asc' | 'desc' };
}

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
      setError('Failed to load data');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const sortedMovies = [...movies]
    .filter(filter)
    .sort((a, b) => {
      if (sort.criteria === 'name') {
        return sort.order === 'asc'
          ? a.meta.name.localeCompare(b.meta.name)
          : b.meta.name.localeCompare(a.meta.name);
      } else if (sort.criteria === 'releaseDate') {
        return sort.order === 'asc'
          ? new Date(a.meta.first_release_date).getTime() - new Date(b.meta.first_release_date).getTime()
          : new Date(b.meta.first_release_date).getTime() - new Date(a.meta.first_release_date).getTime();
      } else if (sort.criteria === 'runtime') {
        return sort.order === 'asc'
          ? a.meta.runtime - b.meta.runtime
          : b.meta.runtime - a.meta.runtime;
      }
      return 0;
    });

  return (
    <Grid container spacing={2}>
      {sortedMovies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.uuid}>
          <MovieCard
            name={movie.meta.name}
            releaseDate={movie.meta.first_release_date}
            runtime={movie.meta.runtime}
            posterUrl={movie.meta.posters[0]?.url}
            genres={movie.meta.genres}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
