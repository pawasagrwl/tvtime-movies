import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
    document.body.style.backgroundColor = event.target.checked ? '#333' : '#fff';
  };

  return (
    <div>
      <h1>Settings</h1>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleThemeChange} />}
        label="Dark Mode"
      />
    </div>
  );
};

export default Settings;
