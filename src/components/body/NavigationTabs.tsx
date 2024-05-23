import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/system";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StyledTabs = styled(Tabs)({
  minHeight: "32px", // Reduce the thickness of the Tabs
  "& .MuiTabs-indicator": {
    height: "2px", // Make the indicator thinner
  },
  marginBottom: 0, // Minimize space below the tabs
});

const StyledTab = styled(Tab)({
  minHeight: "32px", // Reduce the thickness of the Tab
  fontSize: "1rem", // Increase the font size
  padding: "2px 12px", // Adjust padding to minimize space
});

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <StyledTabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)} // Remove 'event' parameter
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="tabs"
        variant="fullWidth" // Ensure the tabs take the full width
      >
        <StyledTab label="Watchlist" value="watchlist" />
        <StyledTab label="Upcoming" value="upcoming" />
        <StyledTab label="Watched" value="watched" />
      </StyledTabs>
    </Box>
  );
};

export default NavigationTabs;
