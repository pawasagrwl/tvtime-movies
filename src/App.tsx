import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <Body />
        <Footer />
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default App;
