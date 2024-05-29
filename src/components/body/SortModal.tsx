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
} from "@mui/material";
import { styled } from "@mui/system";

interface SortModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (sort: { criteria: string; order: "asc" | "desc" }) => void;
}

const SortModal: React.FC<SortModalProps> = ({ open, onClose, onSave }) => {
  const [sortCriteria, setSortCriteria] = useState("releaseDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSave = () => {
    onSave({ criteria: sortCriteria, order: sortOrder });
    onClose();
  };

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
          Sort Options
        </Typography>
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
          Apply
        </Button>
      </Box>
    </Modal>
  );
};

export default SortModal;
