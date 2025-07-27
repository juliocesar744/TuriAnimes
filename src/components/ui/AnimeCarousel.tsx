import { Box, Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import type { AnimeDetails } from '../../types/anime';

interface Anime {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  genres: string[];
}

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        { breakpoint: 960, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
}

export default function AnimeCarousel() {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAnimes() {
            try {
                const response = await fetch("https://kitsu.io/api/edge/anime?page[limit]=10");
                const json = await response.json();

                const animes = await Promise.all(
                    json.data.map(async (item: AnimeDetails) => {
                    const id = item.id;
                    const title = item.attributes.titles.en || item.attributes.titles.en_jp || item.attributes.titles.ja_jp;
                    const imageUrl = item.attributes.posterImage?.medium;
                    const rating = item.attributes.averageRating || "N/A";

                    const genreResponse = await fetch(item.relationships.genres.links.related);
                    const genreJson = await genreResponse.json();
                    const genres = genreJson.data.map((g: AnimeDetails) => g.attributes.name);

                    return { id, title, imageUrl, rating, genres };
                    })
                );

                setAnimeList(animes);
            } catch (error) {
                console.error("Erro ao buscar animes:", error);
            }
        }
        fetchAnimes();
    }, []);
    

      return (
        <>
            <Grid container spacing={2} sx={{ justifyContent: "space-between", m: '2rem 2.5rem 0' }}>
                <Grid size={10}>
                    <Typography variant='h4'>Top 10 Animes</Typography>
                </Grid>
                <Grid size={2} display="flex" justifyContent="end">
                    <Button size='small' variant='text' onClick={() => navigate('/animeList')}>Ver Todos</Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
            <Slider {...settings}>
            {animeList.map((anime) => (
                <Box key={anime.id} px={1}>
                <Card sx={{ maxWidth: 300, margin: 'auto', height: '553px' }}>
                    <CardMedia
                    component="img"
                    image={anime.imageUrl}
                    alt={anime.title}
                    height="400"
                    />
                    <CardContent>
                        <Typography variant="h6" noWrap>
                            {anime.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                            Rating: {anime.rating} <StarIcon color="primary" />
                        </Typography>
                    </CardContent>
                    <Grid container spacing={2} m={1}>
                        {anime.genres.map((genre, index) => (
                            <Grid key={genre + index}>
                                <Button 
                                    variant='outlined' 
                                    sx={{ borderRadius:'5rem', fontSize:'0.7rem', height: '1rem', width: 'auto', minWidth: 'unset', textTransform: 'none', padding: '0.3rem'}}
                                > 
                                    { genre } 
                                </Button>
                            </Grid>
                    ))}
                    </Grid>
                </Card>
                </Box>
            ))}
            </Slider>
        </Box>
      </>
      )
}