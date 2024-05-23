import React from "react";
import { Box, Typography } from "@mui/material";
import { StyledTab, StyledTabs } from "../styled/tabs";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  movieCounts: { watchlist: number; upcoming: number; watched: number };
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  movieCounts,
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
        <StyledTab
          label={
            <Box>
              <Typography>Watchlist</Typography>
              <Typography variant="caption">{`(${movieCounts.watchlist})`}</Typography>
            </Box>
          }
          value="watchlist"
        />
        <StyledTab
          label={
            <Box>
              <Typography>Upcoming</Typography>
              <Typography variant="caption">{`(${movieCounts.upcoming})`}</Typography>
            </Box>
          }
          value="upcoming"
        />
        <StyledTab
          label={
            <Box>
              <Typography>Watched</Typography>
              <Typography variant="caption">{`(${movieCounts.watched})`}</Typography>
            </Box>
          }
          value="watched"
        />
      </StyledTabs>
    </Box>
  );
};

export default NavigationTabs;
