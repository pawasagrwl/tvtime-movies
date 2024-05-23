import React, { useState } from 'react';
import {
  Box,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (filter: { genre?: string; year?: string; runtime?: string }, sort: { criteria: string; order: 'asc' | 'desc' }) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({ open, onClose, onSave }) => {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [runtime, setRuntime] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSave = () => {
    onSave({ genre, year, runtime }, { criteria: sortCriteria, order: sortOrder });
    onClose();
  };

  const CompactTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
  }));

  const CompactSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        padding={4}
        bgcolor="background.paper"
        borderRadius={2}
        boxShadow={24}
        maxWidth={400}
        margin="auto"
        mt={5}
      >
        <Typography variant="h6" align="center">Filter and Sort</Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Genre</InputLabel>
          <CompactSelect
            value={genre}
            onChange={(e) => setGenre(e.target.value as string)}
            label="Genre"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
          onChange={(e) => setYear(e.target.value as string)}
          type="number"
          fullWidth
        />
        <CompactTextField
          variant="outlined"
          label="Runtime"
          value={runtime}
          onChange={(e) => setRuntime(e.target.value as string)}
          fullWidth
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Sort By</InputLabel>
          <CompactSelect
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value as string)}
            label="Sort By"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default FiltersModal;
