import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CopyrightIcon from "@mui/icons-material/Copyright";
import axios from "axios";

const Footer: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/path/to/data.json");
        setLastUpdated(response.data.data.last_updated);
      } catch (error) {
        console.error("Error fetching last updated date:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="8px 16px"
      bgcolor="#1C1C1C"
      color="#FFFFFF"
      position="sticky"
      bottom={0}
      height="40px"
      fontSize="14px" // Ensures the font size for all elements
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="github"
            component="a"
            href="https://github.com/pawasagrwl/tvtime-movies"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "inherit" }}
          >
            <GitHubIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="body2">Last updated: {lastUpdated}</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <CopyrightIcon style={{ fontSize: "inherit" }} />
            2024 Pawas Aggarwal
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
