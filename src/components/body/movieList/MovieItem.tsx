import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import MovieModal from "./MovieModal";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { MovieItemProps } from "../../../types/types";
import {
  formatDate,
  formatRuntime,
  formatReleaseDays,
} from "../../../utils/format";

const MovieItem: React.FC<MovieItemProps> = ({
  uuid,
  name,
  releaseDate,
  runtime,
  posterUrl,
  genres,
  overview,
  trailers,
  meta,
  extended,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const releaseDateFormatted = formatDate(releaseDate);
  const daysUntilRelease = formatReleaseDays(releaseDate);

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
            position: "relative", // Ensure relative positioning for the link button
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
                lineHeight: "1.2", // Adjust this value to decrease space between lines
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
          <Box display="flex" alignItems="center">
            <Typography variant="body2" style={{ marginBottom: "4px" }}>
              {formatRuntime(runtime)}
            </Typography>
            <FiberManualRecordIcon sx={{ fontSize: 8, mx: 1 }} />
            {daysUntilRelease !== null && daysUntilRelease > 0 && (
              <>
                <Typography
                  variant="body2"
                  style={{
                    color: "#FFA500",
                    marginBottom: "4px",
                  }}
                >
                  {daysUntilRelease}
                  <Typography
                    variant="caption"
                    style={{
                      color: "#FFA500",
                      marginBottom: "4px",
                    }}
                  >
                    {" "}
                    days
                  </Typography>
                </Typography>
                <FiberManualRecordIcon sx={{ fontSize: 8, mx: 1 }} />
              </>
            )}
            <Typography variant="body2" style={{ marginBottom: "4px" }}>
              {releaseDateFormatted}
            </Typography>
            <FiberManualRecordIcon sx={{ fontSize: 8, mx: 1 }} />
            <IconButton
              href={`https://app.tvtime.com/movie/${uuid}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#FFA500", ml: 2 }}
              onClick={(e) => e.stopPropagation()} // Prevent opening the modal on click
            >
              <LinkIcon />
            </IconButton>
          </Box>
          {/* Display keywords */}
          <Typography
            variant="body2"
            style={{
              color: "#a0a0a0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: "4px",
            }}
          >
            {meta.keywords ? meta.keywords.join(", ") : "No Keywords Found"}
          </Typography>
        </CardContent>
      </Card>

      <MovieModal
        open={open}
        onClose={handleClose}
        movie={{
          uuid,
          name,
          releaseDate,
          runtime,
          posterUrl,
          genres,
          overview,
          trailers,
          meta,
          extended,
        }}
      />
    </>
  );
};

export default MovieItem;
