import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/system';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: '32px',
  '& .MuiTabs-indicator': {
    height: '3px',
    backgroundColor: theme.palette.primary.main,
  },
  marginBottom: '0px',
  padding: '0px',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: '32px',
  fontSize: '1rem',
  padding: '6px 12px',
  textTransform: 'none',
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Box display="flex" justifyContent="center" width="100%" bgcolor="background.default">
      <StyledTabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        aria-label="tabs"
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
