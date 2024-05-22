import React, { useState } from "react";
import MovieList from "../components/MovieList";
import FiltersBar from "../components/FiltersBar";

const Upcoming: React.FC = () => {
  const [filters, setFilters] = useState<{
    genre?: string;
    year?: string;
    runtime?: string;
  }>({});
  const [sort, setSort] = useState<{ criteria: string; order: "asc" | "desc" }>(
    { criteria: "", order: "asc" }
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filter: any) => {
    setFilters(filter);
  };

  const handleSortChange = (sort: any) => {
    setSort(sort);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="container">
      <FiltersBar
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
      />
      <MovieList
        filter={(movie) => {
          const isUpcoming =
            !movie.meta.first_release_date ||
            new Date(movie.meta.first_release_date) >= new Date();
          const matchesGenre =
            !filters.genre || movie.meta.genres.includes(filters.genre);
          const matchesYear =
            !filters.year ||
            new Date(movie.meta.first_release_date).getFullYear() ===
              parseInt(filters.year);
          const matchesRuntime =
            !filters.runtime ||
            movie.meta.runtime.toString().includes(filters.runtime);
          const matchesSearch =
            !searchTerm ||
            movie.meta.name.toLowerCase().includes(searchTerm.toLowerCase());
          return (
            isUpcoming &&
            matchesGenre &&
            matchesYear &&
            matchesRuntime &&
            matchesSearch
          );
        }}
        sort={sort}
      />
    </div>
  );
};

export default Upcoming;
