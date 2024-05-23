import React, { useState } from "react";
import {
  Box,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Slider,
  TextField,
} from "@mui/material";
import { Autocomplete } from "@mui/lab";
import { styled } from "@mui/system";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    filter: { genre?: string[]; year?: number[]; runtime?: number[] },
    sort: { criteria: string; order: "asc" | "desc" }
  ) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [genre, setGenre] = useState<string[]>([]);
  const [year, setYear] = useState<number[]>([1900, new Date().getFullYear()]);
  const [runtime, setRuntime] = useState<number[]>([0, 360]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSave = () => {
    onSave(
      { genre, year, runtime },
      { criteria: sortCriteria, order: sortOrder }
    );
    onClose();
  };

  const genresOptions = ["Action", "Comedy", "Drama", "Science Fiction"];

  const CompactTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: theme.palette.background.paper,
    },
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
    },
  }));

  const CompactSelect = styled(Select)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: theme.palette.background.paper,
    },
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
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
        <Typography variant="h6" align="center">
          Filter and Sort
        </Typography>
        <FormControl variant="outlined" fullWidth>
          <Autocomplete
            multiple
            options={genresOptions}
            value={genre}
            onChange={(event, newValue) => setGenre(newValue)}
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
        <Typography variant="body1">Year Range</Typography>
        <Slider
          value={year}
          onChange={(event, newValue) => setYear(newValue as number[])}
          valueLabelDisplay="auto"
          min={1900}
          max={new Date().getFullYear()}
        />
        <Typography variant="body1">Runtime Range (minutes)</Typography>
        <Slider
          value={runtime}
          onChange={(event, newValue) => setRuntime(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={360}
          step={15}
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
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
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
