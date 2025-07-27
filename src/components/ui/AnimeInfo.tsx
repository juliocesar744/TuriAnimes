import { Box, Typography, Chip, Stack } from '@mui/material';

interface AnimeInfoProps {
  rating?: string;
  status?: string;
  type?: string;
  release?: string;
  genres: string[];
}

export default function AnimeInfo({ rating, status, type, release, genres }: AnimeInfoProps) {
  return (
    <Box m={2}>
      <Typography variant="body1" mt={1}>
        <strong>Nota:</strong> {rating ?? 'N/A'}
      </Typography>
      <Typography variant="body1">
        <strong>Status:</strong> {status ?? 'Desconhecido'}
      </Typography>
      <Typography variant="body1">
        <strong>Tipo:</strong> {type ?? 'Desconhecido'}
      </Typography>
      <Typography variant="body1">
        <strong>Lançamento:</strong> {release ?? 'Desconhecido'}
      </Typography>

      <Box mt={2}>
        <Typography variant="body1" gutterBottom>
          <strong>Gêneros:</strong>
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <Chip key={genre} label={genre} size="small" color="primary" />
            ))
          ) : (
            <Typography variant="body2">Nenhum gênero listado</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
