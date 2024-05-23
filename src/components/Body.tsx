import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavigationTabs from './NavigationTabs';
import Watchlist from '../pages/Watchlist';
import Upcoming from '../pages/Upcoming';
import Watched from '../pages/Watched';

const Body: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('watchlist');

  return (
    <div>
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box mt={2}>
        {activeTab === 'watchlist' && <Watchlist />}
        {activeTab === 'upcoming' && <Upcoming />}
        {activeTab === 'watched' && <Watched />}
      </Box>
    </div>
  );
};

export default Body;
