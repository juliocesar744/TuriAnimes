import { useParams } from "react-router-dom";
import { useAnimeDetails } from "../hooks/useAnimeDetails";
import { Box, Typography, CircularProgress } from "@mui/material";
import AnimeInfo from "../components/ui/AnimeInfo";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AnimeStaff from "../components/ui/AnimeStaff";

export default function AnimeDetails() {
  const { id } = useParams();
  const { anime, genres, loading } = useAnimeDetails(id);

  if (loading || !anime) return <CircularProgress />;

  const attr = anime.attributes;

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
            <Box sx={{ flexGrow: 1, px: 2, overflowX: "hidden", mt:"1rem", mb: "1rem"}}>
            <Typography variant="h4">{attr.canonicalTitle}</Typography>

            <Box display="flex" gap={4} mt={2}>
                <Box
                    component="img"
                    src={attr.posterImage?.large}
                    alt="Poster"
                    sx={{
                        width: 300,
                        height: 450,
                        borderRadius: 2,
                        display: {
                        xs: "none",
                        sm: "block",
                        },
                    }}
                />

                <Box sx={{ border: "1px solid #000", borderRadius: '2rem'}}>
                    <AnimeInfo
                        rating={attr.averageRating}
                        status={attr.status}
                        type={attr.showType}
                        release={attr.startDate}
                        genres={genres}
                    />
                    <AnimeStaff animeId={id} />
                    <Typography mt={2} ml={2}><strong>Sinopse:</strong></Typography>
                    <Typography m={2} variant="body2">{attr.synopsis}</Typography>

                    {attr.youtubeVideoId && (
                        <Box m={2}>
                            <Typography variant="h6" gutterBottom>
                            Trailer
                            </Typography>
                            <Box
                                component="iframe"
                                width="100%"
                                height="600"
                                src={`https://www.youtube.com/embed/${attr.youtubeVideoId}`}
                                title="Trailer do Anime"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                sx={{
                                    border: "none",
                                    borderRadius: 2,
                                    maxWidth: "800px",
                                }}
                            />
                        </Box>
                        )}
                </Box>
            </Box>
        </Box>
        <Footer />
    </Box>
  );
}
