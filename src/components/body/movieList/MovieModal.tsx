import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  CardMedia,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MovieModalProps } from "../../../types/types";
import { formatDate, formatRuntime } from "../../../utils/format";
import MovieRatings from "./MovieRatings";

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
          maxWidth: "95%",
          width: "90%",
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
          <IconButton aria-label="close" onClick={onClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ padding: "16px" }}>
          {/* Name and Rating */}
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#ffdd57" }}
          >
            {movie.name}
          </Typography>
          <MovieRatings movieName={movie.name} />

          <Divider sx={{ my: 2, borderColor: "#444" }} />

          {/* Keywords */}
          <Typography variant="subtitle1" gutterBottom>
            Keywords:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {movie.meta.keywords?.length ? (
              movie.meta.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  sx={{ backgroundColor: "#333", color: "#fff" }}
                />
              ))
            ) : (
              "No Keywords Found"
            )}
          </Box>

          <Divider sx={{ my: 2, borderColor: "#444" }} />

          {/* Runtime and Details */}
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Release Date: {formatDate(movie.releaseDate)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Runtime: {formatRuntime(movie.runtime)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Genres: {movie.genres.join(", ")}
          </Typography>

          <Divider sx={{ my: 2, borderColor: "#444" }} />

          {/* Overview */}
          <Typography variant="subtitle1" gutterBottom>
            Overview:
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "#a0a0a0" }}>
            {movie.overview}
          </Typography>

          {/* Trailers */}
          {Array.isArray(movie.trailers) && movie.trailers.length > 0 && (
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


          {/* Poster at the end */}
          {movie.posterUrl && (
            <>
              <Divider sx={{ my: 2, borderColor: "#444" }} />
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
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default MovieModal;
