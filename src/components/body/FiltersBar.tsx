import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import { Edit, Clear, FilterList, Sort, Replay } from "@mui/icons-material";
import FiltersModal from "./FiltersModal";
import SortModal from "./SortModal";

interface FiltersBarProps {
  onFilterChange: (filter: {
    genre?: string[];
    year?: number[];
    runtime?: number[];
    series?: string[];
    language?: string;
    allGenres?: boolean;
  }) => void;
  onSortChange: (sort: { criteria: string; order: "asc" | "desc" }) => void;
  onSearchChange: (searchTerm: string) => void;
  genres: string[];
  years: number[];
  runtimes: number[];
  series: string[];
  languages: string[];
}

const CompactTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 14px",
  },
  "& .MuiInputAdornment-positionEnd": {
    marginRight: "4px",
  },
}));

const CircleIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "50%",
  border: `1px solid ${theme.palette.divider}`,
  padding: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FiltersBar: React.FC<FiltersBarProps> = ({
  onFilterChange,
  onSortChange,
  onSearchChange,
  genres,
  years,
  runtimes,
  series,
  languages,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    onFilterChange({});
    onSortChange({ criteria: "", order: "asc" });
    onSearchChange("");
  };

  const handleSaveFilters = (filter: {
    genre?: string[];
    year?: number[];
    runtime?: number[];
    series?: string[];
    language?: string;
    allGenres?: boolean;
  }) => {
    onFilterChange(filter);
  };

  const handleSaveSort = (sort: {
    criteria: string;
    order: "asc" | "desc";
  }) => {
    onSortChange(sort);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={1} padding="0.01rem 0.5rem">
        <CompactTextField
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {searchTerm ? (
                  <IconButton
                    onClick={() => setSearchTerm("")}
                    color="secondary"
                  >
                    <Clear />
                  </IconButton>
                ) : (
                  <IconButton edge="start" disabled>
                    <Edit />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />

        <CircleIconButton onClick={() => setOpenFilters(true)} color="primary">
          <FilterList />
        </CircleIconButton>
        <CircleIconButton onClick={() => setOpenSort(true)} color="primary">
          <Sort />
        </CircleIconButton>
        <CircleIconButton onClick={handleReset} color="secondary">
          <Replay />
        </CircleIconButton>
      </Box>

      <FiltersModal
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        onSave={handleSaveFilters}
        genres={genres}
        years={years}
        runtimes={runtimes}
        series={series}
        languages={languages}
      />
      <SortModal
        open={openSort}
        onClose={() => setOpenSort(false)}
        onSave={handleSaveSort}
      />
    </>
  );
};

export default FiltersBar;
