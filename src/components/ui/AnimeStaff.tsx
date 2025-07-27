import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useAnimeStaff } from '../../hooks/useAnimeStaff';

interface AnimeStaffProps {
  animeId?: string;
}

export default function AnimeStaff({ animeId }: AnimeStaffProps) {
  const { staff, loading, error } = useAnimeStaff(animeId);

  if (loading) return <Box textAlign="center" mt={2}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box mt={4} ml={2}>
      <Typography variant="h6" gutterBottom>
        Staff
      </Typography>
        {staff.map(({ name, role }) => (
            <>
            <Typography>
                <strong>{role} : </strong>{name}
            </Typography>
            
        </>
        ))}
    </Box>
  );
}
