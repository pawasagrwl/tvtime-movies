import React from "react";
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

const MovieModal: React.FC<MovieModalProps> = ({ open, onClose, movie }) => {
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
          p: 4,
          maxWidth: "70%", // Increase the maxWidth to make the modal wider
          width: "90%", // Set the width to 90% of the viewport width
          maxHeight: "90%",
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
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
        {movie.posterUrl && (
          <CardMedia
            component="img"
            image={movie.posterUrl}
            alt={movie.name}
            sx={{
              width: "100%",
              height: 300,
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
      </Box>
    </Modal>
  );
};

export default MovieModal;
