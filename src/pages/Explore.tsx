import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
} from '@mui/material';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { Link as RouterLink } from 'react-router-dom';

interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    synopsis: string;
    posterImage: {
      small: string;
    };
  };
}

export default function Explore() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchAnime = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setAnimes(data.data);
      } catch (error) {
        console.error('Erro ao buscar animes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [query]);

  return (
     <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            overflowX: "hidden",
          }}
        >
          <Header />
    
          <Box sx={{ flexGrow: 1, px: 2, overflowX: "hidden", m: '1rem'}}>
            <Typography variant="h4" gutterBottom>
                Resultados para: <strong>{query}</strong>
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
                </Box>
            ) : (
                
                <Grid container spacing={2}>
                {animes.length === 0 &&
                    <Typography>
                        Sinto muito, nenhum anime foi encontrado :(
                    </Typography>
                }
                {animes.map((anime) => (
                    <Grid key={anime.id} size={{ xs: 12, md: 3 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={anime.attributes.posterImage.small}
                            alt={anime.attributes.canonicalTitle}
                        />
                        <CardContent>
                        <Link 
                            variant="h6" 
                            gutterBottom 
                            underline='none'
                            component={RouterLink}
                            to={`/anime/${anime.id}`}
                        >
                            {anime.attributes.canonicalTitle}
                        </Link>
                        <Typography variant="body2" color="text.secondary">
                            {anime.attributes.synopsis.slice(0, 120)}...
                        </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            )}
            </Box>
    <Footer />
    </Box>
  );
}
