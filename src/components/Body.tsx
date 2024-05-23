import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavigationTabs from './body/NavigationTabs';
import Watchlist from './body/tabs/Watchlist';
import Upcoming from './body/tabs/Upcoming';
import Watched from './body/tabs/Watched';

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
