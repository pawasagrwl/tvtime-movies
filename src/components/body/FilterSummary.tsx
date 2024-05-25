import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";

interface FilterSummaryProps {
  count: number;
  sort: { criteria: string; order: "asc" | "desc" };
}

const FilterSummary: React.FC<FilterSummaryProps> = ({ count, sort }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formatSort = () => {
    if (!sort.criteria) return "None";
    const criteria =
      sort.criteria.charAt(0).toUpperCase() + sort.criteria.slice(1);
    const order = sort.order === "asc" ? "ASC" : "DESC";
    return `${criteria} (${order})`;
  };

  return (
    <>
      <Divider
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          margin: "8px 0",
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={1}
        bgcolor="background.paper"
        borderRadius={1}
        boxShadow={2} // Enhanced shadow for depth
        mt={0}
        mb={0.8} // Added equal margin-bottom for uniform space
        sx={{
          backgroundColor: theme.palette.grey[900], // Slightly different background
          flexDirection: isSmallScreen ? "column" : "row",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.12)", // Subtle border for separation
        }}
      >
        <Typography
          variant="body2"
          component="span"
          style={{ fontWeight: 500 }}
        >
          {count} movies filtered. Sorted by {formatSort()}.
        </Typography>
      </Box>
    </>
  );
};

export default FilterSummary;
