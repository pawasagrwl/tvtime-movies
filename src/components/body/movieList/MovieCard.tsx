import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import MovieModal from './MovieModal';

interface MovieCardProps {
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

const MovieCard: React.FC<MovieCardProps> = ({
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

  return (
    <>
      <Card
        style={{ display: 'flex', marginBottom: '8px', backgroundColor: '#2A2A2A', color: '#FFFFFF' }}
        onClick={handleOpen}
      >
        {posterUrl ? (
          <CardMedia
            component="img"
            style={{ width: 100, height: 150, objectFit: 'cover' }}
            image={posterUrl}
            alt={name}
          />
        ) : (
          <Box
            style={{
              width: 100,
              height: 150,
              backgroundColor: '#ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" color="textSecondary">No Image</Typography>
          </Box>
        )}
        <CardContent style={{ flex: '1 0 auto', padding: '8px 16px' }}>
          <Typography
            variant="h6"
            style={{
              fontWeight: 'bold',
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // Limit to 2 lines
            }}
          >
            {name}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '4px' }}>Release Date: {releaseDate}</Typography>
          <Typography variant="body2" style={{ marginBottom: '4px' }}>Runtime: {formatRuntime(runtime)}</Typography>
          <Typography
            variant="body2"
            style={{
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // Limit to 2 lines
            }}
          >
            Genres: {genres.join(', ')}
          </Typography>
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

export default MovieCard;
