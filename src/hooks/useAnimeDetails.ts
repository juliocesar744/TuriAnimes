import { useEffect, useState } from "react";
import { fetchAnimeById, fetchGenresByAnime, fetchStaffByAnime } from "../services/kitsu";
import type { AnimeDetails } from "../types/anime";

export function useAnimeDetails(id: string | undefined) {
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [staff, setStaff] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const [a, g, s] = await Promise.all([
          fetchAnimeById(id),
          fetchGenresByAnime(id),
          fetchStaffByAnime(id),
        ]);
        setAnime(a);
        setGenres(g);
        setStaff(s);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { anime, genres, staff, loading };
}