import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import TvIcon from "@mui/icons-material/Tv";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, darkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="tv-icon">
          <TvIcon />
        </IconButton>
        <Typography
          variant="h4"
          style={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          TV Time Movies
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="toggle-theme"
          onClick={toggleTheme}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
