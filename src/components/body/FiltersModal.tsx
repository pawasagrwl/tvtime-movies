import React, { useState } from "react";
import {
  Box,
  Modal,
  FormControl,
  Button,
  Typography,
  Slider,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Autocomplete } from "@mui/lab";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (filter: {
    genre?: string[];
    year?: number[];
    runtime?: number[];
    allGenres?: boolean;
  }) => void;
  genres: string[];
  years: number[];
  runtimes: number[];
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  open,
  onClose,
  onSave,
  genres,
  years,
  runtimes,
}) => {
  const [genre, setGenre] = useState<string[]>([]);
  const [year, setYear] = useState<number[]>([years[0], years[1]]);
  const [runtime, setRuntime] = useState<number[]>([runtimes[0], runtimes[1]]);
  const [allGenres, setAllGenres] = useState<boolean>(false);

  const handleSave = () => {
    onSave({ genre, year, runtime, allGenres });
    onClose();
  };

  // Sort genres alphabetically
  const sortedGenres = [...genres].sort();

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
        <Typography variant="h6" align="center">
          Filter and Sort
        </Typography>
        <FormControl variant="outlined" fullWidth>
          <Autocomplete
            multiple
            options={sortedGenres}
            value={genre}
            onChange={(_, newValue) => setGenre(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Genre"
                placeholder="Select genres"
              />
            )}
          />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={allGenres}
              onChange={(e) => setAllGenres(e.target.checked)}
              name="allGenres"
            />
          }
          label="Show movies containing all selected genres"
        />
        <Typography variant="body1">Year Range</Typography>
        <Slider
          value={year}
          onChange={(_, newValue) => setYear(newValue as number[])}
          valueLabelDisplay="auto"
          min={years[0]}
          max={years[1]}
        />
        <Typography variant="body1">Runtime Range (minutes)</Typography>
        <Slider
          value={runtime}
          onChange={(_, newValue) => setRuntime(newValue as number[])}
          valueLabelDisplay="auto"
          min={runtimes[0]}
          max={runtimes[1]}
          step={15}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Apply
        </Button>
      </Box>
    </Modal>
  );
};

export default FiltersModal;
