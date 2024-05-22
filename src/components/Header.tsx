import React from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#1C1C1C', boxShadow: 'none' }}>
      <Toolbar>
        <Box display="flex" justifyContent="center" width="100%">
          <Typography variant="h6" style={{ color: '#FFFFFF', fontFamily: 'Cursive', fontSize: '1.5rem', fontWeight: 'bold' }}>
            TV Time Movies
          </Typography>
        </Box>
      </Toolbar>
      <Tabs
        value={currentTab}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        style={{ backgroundColor: '#333333' }}
      >
        <Tab label="Watchlist" value="/watchlist" component={Link} to="/watchlist" style={{ color: '#FFFFFF' }} />
        <Tab label="Upcoming" value="/upcoming" component={Link} to="/upcoming" style={{ color: '#FFFFFF' }} />
        <Tab label="Watched" value="/watched" component={Link} to="/watched" style={{ color: '#FFFFFF' }} />
      </Tabs>
    </AppBar>
  );
};

export default Header;
