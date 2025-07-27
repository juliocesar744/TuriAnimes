import AnimeCarousel from "../components/ui/AnimeCarousel";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Box } from "@mui/material";



export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
        <Box sx={{ flexGrow: 1 }}>
          <AnimeCarousel />
        </Box>
      <Footer />
    </Box>
  );
}