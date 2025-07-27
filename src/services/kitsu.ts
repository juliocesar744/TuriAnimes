import type { AnimeDetails } from "../types/anime";

export async function fetchAnimeById(id: string) {
  const res = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
  const json = await res.json();
  return json.data;
}

export async function fetchGenresByAnime(id: string) {
  const res = await fetch(`https://kitsu.io/api/edge/anime/${id}/genres`);
  const json = await res.json();
  return json.data.map((g: AnimeDetails) => g.attributes.name);
}

export async function fetchStaffByAnime(id: string) {
  const res = await fetch(`https://kitsu.io/api/edge/anime/${id}/staff`);
  const json = await res.json();
  return json.data.map((s: AnimeDetails) => s.attributes.role);
}