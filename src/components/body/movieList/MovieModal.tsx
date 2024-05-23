import React from 'react';
import { Modal, Box, Typography, IconButton, CardMedia, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface MovieModalProps {
  open: boolean;
  onClose: () => void;
  movie: {
    name: string;
    releaseDate: string;
    runtime: number;
    posterUrl?: string;
    genres: string[];
    overview: string;
    trailers?: { name: string; url: string; thumb_url: string }[];
  };
}

const formatRuntime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const MovieModal: React.FC<MovieModalProps> = ({ open, onClose, movie }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 600,
          width: '90%',
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {movie.posterUrl ? (
          <CardMedia
            component="img"
            image={movie.posterUrl}
            alt={movie.name}
            sx={{ width: '100%', height: 300, objectFit: 'cover', mb: 2 }}
          />
        ) : null}
        <Typography variant="h4" component="h2" gutterBottom>
          {movie.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Release Date: {movie.releaseDate}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Runtime: {formatRuntime(movie.runtime)}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Genres: {movie.genres.join(', ')}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" gutterBottom>
          {movie.overview}
        </Typography>
        {movie.trailers && movie.trailers.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Trailers
            </Typography>
            {movie.trailers.map((trailer, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <CardMedia
                  component="img"
                  image={trailer.thumb_url}
                  alt={trailer.name}
                  sx={{ width: 120, height: 67, objectFit: 'cover', mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" component="a" href={trailer.url} target="_blank" rel="noopener noreferrer" color="primary">
                    {trailer.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MovieModal;
