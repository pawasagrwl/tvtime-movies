import { styled } from "@mui/material/styles";
import { Tabs, Tab } from "@mui/material";

export const StyledTab = styled(Tab)({
  fontWeight: 700,
  textTransform: "none",
  minHeight: "48px",
  fontSize: "1.1rem", // Slightly larger font
  flex: 1, // Each tab takes equal space
  padding: "6px 12px", // More padding for bigger tabs
  "&.Mui-selected": {
    color: "#f50057", // Highlight color when selected
  },
  borderBottom: "3px solid transparent", // Add transparency for unselected tabs
  "&:not(:last-of-type)": {
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  },
});

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
  color: theme.palette.mode === "dark" ? "#fff" : "#000",
  minHeight: "48px",
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.secondary.main,
    height: "4px",
  },
  marginBottom: 0,
  width: "100%", 
}));
