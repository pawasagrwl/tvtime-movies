import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavigationTabs from './body/NavigationTabs';
import FiltersBar from './body/FiltersBar';
import MovieList from './body/movieList/MovieList';

const Body: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('watchlist');
  const [filters, setFilters] = useState<{ genre?: string[]; year?: number[]; runtime?: number[] }>({});
  const [sort, setSort] = useState<{ criteria: string; order: 'asc' | 'desc' }>({ criteria: '', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filter: { genre?: string[]; year?: number[]; runtime?: number[] }) => {
    setFilters(filter);
  };

  const handleSortChange = (sort: { criteria: string; order: 'asc' | 'desc' }) => {
    setSort(sort);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filterMovies = (movie: any) => {
    if (activeTab === 'watchlist') {
      return !movie.extended.is_watched && movie.meta.is_released;
    }
    if (activeTab === 'upcoming') {
      return !movie.meta.is_released;
    }
    if (activeTab === 'watched') {
      return movie.extended.is_watched;
    }
    return true;
  };

  return (
    <div>
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box mt={2}>
        <FiltersBar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
        />
        <MovieList
          filter={(movie) => {
            const matchesTab = filterMovies(movie);
            const matchesGenre = filters.genre?.length ? filters.genre.some((genre) => movie.meta.genres.includes(genre)) : true;
            const movieYear = new Date(movie.meta.first_release_date).getFullYear();
            const matchesYear = filters.year?.length ? movieYear >= filters.year[0] && movieYear <= filters.year[1] : true;
            const matchesRuntime = filters.runtime?.length ? movie.meta.runtime >= filters.runtime[0] * 60 && movie.meta.runtime <= filters.runtime[1] * 60 : true;
            const matchesSearch = searchTerm ? movie.meta.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            return matchesTab && matchesGenre && matchesYear && matchesRuntime && matchesSearch;
          }}
          sort={sort}
        />
      </Box>
    </div>
  );
};

export default Body;