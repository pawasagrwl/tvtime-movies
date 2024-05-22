import React, { useState } from 'react';
import { Box, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { styled } from '@mui/system';
import { FilterList, Sort, Search, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface FiltersBarProps {
  onFilterChange: (filter: { genre?: string; year?: string; runtime?: string }) => void;
  onSortChange: (sort: { criteria: string; order: 'asc' | 'desc' }) => void;
  onSearchChange: (searchTerm: string) => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({ onFilterChange, onSortChange, onSearchChange }) => {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [runtime, setRuntime] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ genre, year, runtime });
  };

  const handleSortChange = () => {
    onSortChange({ criteria: sortCriteria, order: sortOrder });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleResetFilters = () => {
    setGenre('');
    setYear('');
    setRuntime('');
    onFilterChange({});
  };

  const handleResetSorting = () => {
    setSortCriteria('');
    setSortOrder('asc');
    onSortChange({ criteria: '', order: 'asc' });
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#1C1C1C',
    borderRadius: '8px',
    marginBottom: theme.spacing(2),
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    height: '56px',
    width: '100%',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  }));

  const CompactTextField = styled(TextField)(({ theme }) => ({
    height: '56px',
  }));

  const CompactSelect = styled(Select)(({ theme }) => ({
    height: '56px',
  }));

  return (
    <StyledBox>
      <Box display="flex" gap={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Genre</InputLabel>
          <CompactSelect
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            label="Genre"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Science Fiction">Science Fiction</MenuItem>
          </CompactSelect>
        </FormControl>
        <CompactTextField
          variant="outlined"
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="number"
          fullWidth
        />
        <CompactTextField
          variant="outlined"
          label="Runtime"
          value={runtime}
          onChange={(e) => setRuntime(e.target.value)}
          fullWidth
        />
        <IconButton onClick={handleFilterChange} color="primary">
          <FilterList />
        </IconButton>
        <IconButton onClick={handleResetFilters} color="secondary">
          <Clear />
        </IconButton>
      </Box>
      <Box display="flex" gap={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Sort By</InputLabel>
          <CompactSelect
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            label="Sort By"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="runtime">Runtime</MenuItem>
          </CompactSelect>
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Order</InputLabel>
          <CompactSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </CompactSelect>
        </FormControl>
        <IconButton onClick={handleSortChange} color="primary">
          <Sort />
        </IconButton>
        <IconButton onClick={handleResetSorting} color="secondary">
          <Clear />
        </IconButton>
      </Box>
      <CompactTextField
        variant="outlined"
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setSearchTerm('')} color="secondary">
              <Clear />
            </IconButton>
          ),
        }}
      />
    </StyledBox>
  );
};

export default FiltersBar;
