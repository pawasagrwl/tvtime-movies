import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Movie, Settings } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <BottomNavigation value={currentTab} style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#1C1C1C' }}>
      <BottomNavigationAction
        label="Movies"
        value="/watchlist"
        icon={<Movie />}
        component={Link}
        to="/watchlist"
        style={{ color: '#FFFFFF' }}
      />
      <BottomNavigationAction
        label="Settings"
        value="/settings"
        icon={<Settings />}
        component={Link}
        to="/settings"
        style={{ color: '#FFFFFF' }}
      />
    </BottomNavigation>
  );
};

export default Footer;
