import React, { useState, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import NavigationTabs from "./body/NavigationTabs";
import FiltersBar from "./body/FiltersBar";
import MovieList from "./body/movieList/MovieList";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterSummary from "./body/FilterSummary";
import data from "../data.json";

const Body: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("watchlist");
  const [filters, setFilters] = useState<{
    genre?: string[];
    year?: number[];
    runtime?: number[];
    allGenres?: boolean;
  }>({});
  const [sort, setSort] = useState<{ criteria: string; order: "asc" | "desc" }>(
    { criteria: "releaseDate", order: "desc" }
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredMovieCount, setFilteredMovieCount] = useState<number>(0);

  const { genres, years, runtimes } = data.data;

  const handleFilterChange = (filter: {
    genre?: string[];
    year?: number[];
    runtime?: number[];
    allGenres?: boolean;
  }) => {
    setFilters(filter);
  };

  const handleSortChange = (sort: {
    criteria: string;
    order: "asc" | "desc";
  }) => {
    setSort(sort);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filterMovies = (movie: any) => {
    if (activeTab === "watchlist") {
      return (
        !movie.extended.is_watched &&
        movie.meta.is_released &&
        movie.meta.runtime > 0
      );
    }
    if (activeTab === "upcoming") {
      return !movie.meta.is_released || movie.meta.runtime === 0;
    }
    if (activeTab === "watched") {
      return movie.extended.is_watched;
    }
    return true;
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getFilteredMovieCount = (movies: any[]) => {
    return movies.filter((movie) => {
      const matchesTab = filterMovies(movie);
      const matchesGenre = filters.genre?.length
        ? filters.allGenres
          ? filters.genre.every((genre) => movie.meta.genres.includes(genre))
          : filters.genre.some((genre) => movie.meta.genres.includes(genre))
        : true;
      const movieYear = new Date(movie.meta.first_release_date).getFullYear();
      const matchesYear = filters.year?.length
        ? movieYear >= filters.year[0] && movieYear <= filters.year[1]
        : true;
      const matchesRuntime = filters.runtime?.length
        ? movie.meta.runtime >= filters.runtime[0] * 60 &&
          movie.meta.runtime <= filters.runtime[1] * 60
        : true;
      const matchesSearch = searchTerm
        ? movie.meta.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return (
        matchesTab &&
        matchesGenre &&
        matchesYear &&
        matchesRuntime &&
        matchesSearch
      );
    }).length;
  };

  useEffect(() => {
    setFilteredMovieCount(getFilteredMovieCount(data.data.objects));
  }, [filters, sort, searchTerm, activeTab]);

  return (
    <div>
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box mt={1}>
        <FiltersBar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          genres={genres}
          years={years}
          runtimes={runtimes}
        />
        <FilterSummary count={filteredMovieCount} sort={sort} />
        <MovieList
          filter={(movie) => {
            const matchesTab = filterMovies(movie);
            const matchesGenre = filters.genre?.length
              ? filters.allGenres
                ? filters.genre.every((genre) =>
                    movie.meta.genres.includes(genre)
                  )
                : filters.genre.some((genre) =>
                    movie.meta.genres.includes(genre)
                  )
              : true;
            const movieYear = new Date(
              movie.meta.first_release_date
            ).getFullYear();
            const matchesYear = filters.year?.length
              ? movieYear >= filters.year[0] && movieYear <= filters.year[1]
              : true;
            const matchesRuntime = filters.runtime?.length
              ? movie.meta.runtime >= filters.runtime[0] * 60 &&
                movie.meta.runtime <= filters.runtime[1] * 60
              : true;
            const matchesSearch = searchTerm
              ? movie.meta.name.toLowerCase().includes(searchTerm.toLowerCase())
              : true;
            return (
              matchesTab &&
              matchesGenre &&
              matchesYear &&
              matchesRuntime &&
              matchesSearch
            );
          }}
          sort={sort}
        />
      </Box>
      <Fab
        color="secondary"
        aria-label="scroll-to-top"
        onClick={handleScrollToTop}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 12,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
};

export default Body;
