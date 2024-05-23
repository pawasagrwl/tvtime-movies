import React from "react";
import { Box } from "@mui/material";
import { StyledTab, StyledTabs } from "../styled/tabs";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <StyledTabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="navigation tabs"
        variant="fullWidth"
      >
        <StyledTab label="Watchlist" value="watchlist" />
        <StyledTab label="Upcoming" value="upcoming" />
        <StyledTab label="Watched" value="watched" />
      </StyledTabs>
    </Box>
  );
};

export default NavigationTabs;
