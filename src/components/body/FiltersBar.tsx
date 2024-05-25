import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import { FilterList, Clear } from "@mui/icons-material";
import FiltersModal from "./FiltersModal";

interface FiltersBarProps {
  onFilterChange: (filter: {
    genre?: string[];
    year?: number[];
    runtime?: number[];
  }) => void;
  onSortChange: (sort: { criteria: string; order: "asc" | "desc" }) => void;
  onSearchChange: (searchTerm: string) => void;
  genres: string[];
  years: number[];
  runtimes: number[];
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

const FiltersBar: React.FC<FiltersBarProps> = ({
  onFilterChange,
  onSortChange,
  onSearchChange,
  genres,
  years,
  runtimes,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleSave = (
    filter: { genre?: string[]; year?: number[]; runtime?: number[] },
    sort: { criteria: string; order: "asc" | "desc" }
  ) => {
    onFilterChange(filter);
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm("")} color="secondary">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={() => setOpen(true)} color="primary">
          <FilterList />
        </IconButton>
        <IconButton onClick={handleReset} color="secondary">
          <Clear />
        </IconButton>
      </Box>

      <FiltersModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        genres={genres}
        years={years}
        runtimes={runtimes}
      />
    </>
  );
};

export default FiltersBar;
