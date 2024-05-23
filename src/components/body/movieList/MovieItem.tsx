import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MovieModal from "./MovieModal";
import { format, parseISO, isValid, differenceInDays } from "date-fns";

interface MovieItemProps {
  name: string;
  releaseDate: string;
  runtime: number;
  posterUrl?: string;
  genres: string[];
  overview: string;
  trailers?: { name: string; url: string; thumb_url: string }[];
}

const formatRuntime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (isValid(date)) {
    return format(date, "dd MMMM yyyy");
  } else {
    return "Invalid Date";
  }
};

const MovieItem: React.FC<MovieItemProps> = ({
  name,
  releaseDate,
  runtime,
  posterUrl,
  genres,
  overview,
  trailers,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const releaseDateFormatted = formatDate(releaseDate);
  const daysUntilRelease = isValid(parseISO(releaseDate))
    ? differenceInDays(new Date(releaseDate), new Date())
    : null;

  return (
    <>
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "8px",
          backgroundColor: "#2A2A2A",
          color: "#FFFFFF",
          width: "100%", // Ensure the card takes full width
          height: "150px", // Ensure the card has a fixed height
        }}
        onClick={handleOpen}
      >
        {posterUrl ? (
          <CardMedia
            component="img"
            style={{ width: 100, height: 150, objectFit: "cover" }}
            image={posterUrl}
            alt={name}
          />
        ) : (
          <Box
            style={{
              width: 100,
              height: 150,
              backgroundColor: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No Image
            </Typography>
          </Box>
        )}
        <CardContent
          style={{
            flex: "1 0 auto",
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            maxWidth: "calc(100% - 100px)", // Adjust based on CardMedia width
          }}
        >
          <Box>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                whiteSpace: "normal", // Allow text to wrap
                overflow: "hidden", // Keep this if you want to avoid overflow beyond a certain limit
                textOverflow: "ellipsis", // This can still be useful if you set a max height
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // You might want to adjust this based on your design
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              style={{
                whiteSpace: "normal", // Allow text to wrap
                overflow: "hidden", // Optional based on your design needs
                textOverflow: "ellipsis", // Use this with a max height if you want to limit the blocks of text
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Adjust the number of lines allowed
              }}
            >
              {genres.join(", ")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" style={{ marginBottom: "4px" }}>
              {formatRuntime(runtime)}
            </Typography>
            {daysUntilRelease !== null && daysUntilRelease > 0 && (
              <Typography
                variant="body2"
                style={{
                  color: "#FFA500",
                  marginBottom: "4px",
                }}
              >
                {daysUntilRelease} days left
              </Typography>
            )}
            <Typography variant="body2" style={{ marginBottom: "4px" }}>
              {releaseDateFormatted}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <MovieModal
        open={open}
        onClose={handleClose}
        movie={{
          name,
          releaseDate,
          runtime,
          posterUrl,
          genres,
          overview,
          trailers,
        }}
      />
    </>
  );
};

export default MovieItem;
