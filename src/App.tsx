import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';

const Watchlist = lazy(() => import('./pages/Watchlist'));
const Upcoming = lazy(() => import('./pages/Upcoming'));
const Watched = lazy(() => import('./pages/Watched'));
const Settings = lazy(() => import('./components/Settings'));

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Navigate to="/watchlist" />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/watched" element={<Watched />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
