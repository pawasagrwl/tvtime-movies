import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
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
          backgroundColor: "#1c1c1c",
          color: "#ffffff",
          width: "100%", // Ensure the card takes full width
          height: "150px", // Ensure the card has a fixed height
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease-in-out",
          cursor: "pointer",
        }}
        onClick={handleOpen}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        {posterUrl ? (
          <CardMedia
            component="img"
            style={{
              width: 100,
              height: 150,
              objectFit: "cover",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
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
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
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
            padding: "16px",
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
                whiteSpace: "normal", // Allow text to wrap normally
                overflow: "hidden", // Optional: Use if you want to avoid overflow beyond the container
                textOverflow: "ellipsis", // Optional: Use if you want to indicate overflow with ellipsis
                display: "block", // Ensure it behaves as a block element
                color: "#ffdd57", // Custom color for the title
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
                WebkitLineClamp: 2, // Adjust the number of lines allowed
                color: "#a0a0a0", // Custom color for the genres
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