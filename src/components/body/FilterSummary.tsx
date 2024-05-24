import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";

interface FilterSummaryProps {
  count: number;
  filters: { genre?: string[]; year?: number[]; runtime?: number[] };
  sort: { criteria: string; order: "asc" | "desc" };
}

const FilterSummary: React.FC<FilterSummaryProps> = ({
  count,
  filters,
  sort,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formatFilters = () => {
    const genreFilter = filters.genre
      ? `Genres: ${filters.genre.join(", ")}`
      : "";
    const yearFilter = filters.year
      ? `Years: ${filters.year[0]} - ${filters.year[1]}`
      : "";
    const runtimeFilter = filters.runtime
      ? `Runtime: ${filters.runtime[0]} - ${filters.runtime[1]} mins`
      : "";
    return [genreFilter, yearFilter, runtimeFilter].filter(Boolean).join("; ");
  };

  const formatSort = () => {
    if (!sort.criteria) return "None";
    const criteria =
      sort.criteria.charAt(0).toUpperCase() + sort.criteria.slice(1);
    const order = sort.order === "asc" ? "Ascending" : "Descending";
    return `${criteria} (${order})`;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={1}
      bgcolor="background.paper"
      borderRadius={1}
      boxShadow={1}
      mt={2}
      sx={{
        flexDirection: isSmallScreen ? "column" : "row",
        "& svg": {
          marginRight: 0.5,
        },
      }}
    >
      <Typography variant="body2" component="span">
        <FilterListIcon fontSize="small" /> {count} movies filtered by{" "}
        {formatFilters()}.
      </Typography>
      <Typography
        variant="body2"
        component="span"
        sx={{ marginLeft: isSmallScreen ? 0 : 2 }}
      >
        <SortIcon fontSize="small" /> Sorted by {formatSort()}.
      </Typography>
    </Box>
  );
};

export default FilterSummary;
