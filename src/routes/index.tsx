import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AnimeList from "../pages/AnimeList";
import AnimeDetails from "../pages/AnimeDetails";
import Explore from "../pages/Explore";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animeList" element={<AnimeList />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}