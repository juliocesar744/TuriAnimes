import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    posterImage: {
      small: string;
    };
  };
}

export default function AnimeList() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [genre, setGenre] = useState<string | null>(null);

  const genres = [
    { value: "action", label: "Ação" },
    { value: "romance", label: "Romance" },
    { value: "comedy", label: "Comédia" },
    { value: "drama", label: "Drama" },
    { value: "fantasy", label: "Fantasia" },
    { value: "adventure", label: "Aventura" },
    { value: "mystery", label: "Mistério" },
    { value: "horror", label: "Terror" },
    { value: "sci-fi", label: "Ficção Científica" },
  ];

  const fetchAnimes = async (page: number, genre?: string | null) => {
    setLoading(true);
    try {
      let url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${
        page * 20
      }`;
      if (genre) {
        url += `&filter[genres]=${genre}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setAnimes(data.data);
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnimes(page, genre);
  }, [page, genre]);

  const handleGenreClick = (selectedGenre: string) => {
    setGenre(selectedGenre);
    setPage(0);
    setDrawerOpen(false);
  };

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

      <Box sx={{ display: "flex", flexDirection: 'row', m: 2, gap: '1rem'}}>
        <IconButton
          size="medium"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" >
           Lista de Animes (Página {page + 1})
        </Typography>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <Typography variant="h6">Filtrar por Gênero</Typography>
            </ListItem>
            {genres.map((g) => (
              <ListItem key={g.label} disablePadding>
                <ListItemButton onClick={() => handleGenreClick(g.value)}>
                  <ListItemText primary={g.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleGenreClick('')}>
                <ListItemText primary="Remover Filtro" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, px: 2 }}>
          {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {animes.map((anime) => (
              <Grid key={anime.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    width: "212px",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={anime.attributes.posterImage.small}
                    alt={anime.attributes.canonicalTitle}
                    sx={{
                      height: 300,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Tooltip title={anime.attributes.canonicalTitle}>
                      <Link
                        component={RouterLink}
                        to={`/anime/${anime.id}`}
                        underline="none"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {anime.attributes.canonicalTitle}
                      </Link>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box display="flex" justifyContent="center" gap={2} mt={4} mb={3}>
          <Button
            variant="contained"
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Anterior
          </Button>
          <Button variant="contained" onClick={() => setPage((prev) => prev + 1)}>
            Próxima
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
