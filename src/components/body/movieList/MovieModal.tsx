import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  CardMedia,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MovieModalProps } from "../../../types/types";
import { formatDate, formatRuntime } from "../../../utils/format";
import axios from "axios";

const MovieModal: React.FC<MovieModalProps> = ({ open, onClose, movie }) => {
  const [additionalData, setAdditionalData] = useState({
    imdbRating: "",
    imdbParentsGuide: "",
    rottenTomatoesRating: "",
    filmCertification: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://www.omdbapi.com/?t=${encodeURIComponent(
              movie.name
            )}&apikey=853f3339`
          );
          setAdditionalData({
            imdbRating: response.data.imdbRating,
            imdbParentsGuide: response.data.Rated,
            rottenTomatoesRating: response.data.Ratings.find(
              (rating) => rating.Source === "Rotten Tomatoes"
            )?.Value,
            filmCertification: response.data.Rated,
          });
        } catch (error) {
          setError("Failed to fetch additional data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [open, movie.name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#1c1c1c",
          color: "#ffffff",
          boxShadow: 24,
          maxWidth: "95%", // Increase the maxWidth to make the modal wider
          width: "90%", // Set the width to 90% of the viewport width
          maxHeight: "95%",
          borderRadius: 2,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#444",
            borderRadius: "4px",
          },
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#1c1c1c",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            borderBottom: "1px solid #444",
          }}
        >
          <Typography variant="h6">Movie Details</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ padding: "16px" }}>
          {movie.posterUrl && (
            <CardMedia
              component="img"
              image={movie.posterUrl}
              alt={movie.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                mb: 2,
                borderRadius: 1,
              }}
            />
          )}
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#ffdd57" }}
          >
            {movie.name}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "#a0a0a0" }}>
            {movie.overview}
          </Typography>
          {movie.trailers && movie.trailers.length > 0 && (
            <>
              <Divider sx={{ my: 2, borderColor: "#444" }} />
              <Typography variant="h6" gutterBottom>
                Trailers
              </Typography>
              {movie.trailers.map((trailer, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", flexDirection: "column", my: 1 }}
                >
                  <CardMedia
                    component="img"
                    image={trailer.thumb_url}
                    alt={trailer.name}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    component="a"
                    href={trailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#FFA500" }}
                  >
                    {trailer.name}
                  </Typography>
                </Box>
              ))}
            </>
          )}
          <Divider sx={{ my: 2, borderColor: "#444" }} />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Release Date: {formatDate(movie.releaseDate)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Runtime: {formatRuntime(movie.runtime)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Genres: {movie.genres.join(", ")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            IMDb Rating: {additionalData.imdbRating}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Parents Guide: {additionalData.imdbParentsGuide}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Rotten Tomatoes Rating: {additionalData.rottenTomatoesRating}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Film Certification: {additionalData.filmCertification}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default MovieModal;
