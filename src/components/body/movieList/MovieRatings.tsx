// MovieRatings.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import imdbIcon from "../../../assets/icons/imdb.svg";
import rottenTomatoesIcon from "../../../assets/icons/rottentomatoes.svg";
import MovieIcon from "@mui/icons-material/Movie";
import { formatVotes } from "../../../utils/format";

interface MovieRatingsProps {
  movieName: string;
}

const MovieRatings: React.FC<MovieRatingsProps> = ({ movieName }) => {
  const [ratings, setRatings] = useState({
    imdbRating: "",
    imdbVotes: "",
    rottenTomatoesRating: "",
    filmCertification: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(
            movieName
          )}&apikey=853f3339`
        );
        const { Ratings, imdbRating, imdbVotes, Rated } = response.data;
        setRatings({
          imdbRating,
          imdbVotes: formatVotes(imdbVotes), // Format the votes
          rottenTomatoesRating:
            Ratings.find((rating: any) => rating.Source === "Rotten Tomatoes")
              ?.Value || "N/A",
          filmCertification: Rated,
        });
      } catch (error) {
        setError("Failed to fetch ratings");
      }
    };

    fetchRatings();
  }, [movieName]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      mb={2}
    >
      <Box display="flex" alignItems="center" mr={2}>
        <MovieIcon />
        <Typography  ml={0.5} variant="body1">{ratings.filmCertification}</Typography>
      </Box>
      <Box display="flex" alignItems="center" mr={2}>
        <img
          src={imdbIcon}
          alt="IMDb"
          style={{ width: "24px", height: "24px", marginRight: "8px" }}
        />
        <Typography variant="body1" mr={0.5}>
          {ratings.imdbRating}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ({ratings.imdbVotes})
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mr={2}>
        <img
          src={rottenTomatoesIcon}
          alt="Rotten Tomatoes"
          style={{ width: "24px", height: "24px", marginRight: "4px" }}
        />
        <Typography variant="body1">{ratings.rottenTomatoesRating}</Typography>
      </Box>
    </Box>
  );
};

export default MovieRatings;
