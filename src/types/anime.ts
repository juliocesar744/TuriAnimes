export interface AnimeDetails {
  id: string;
  type: string;
  attributes: {
    slug: string;
    synopsis: string;
    description: string;
    canonicalTitle: string;
    name?: string;
    titles: {
      en?: string;
      en_jp?: string;
      ja_jp?: string;
    };
    role?: string;
    averageRating?: string;
    ratingRank?: number;
    ageRating?: string;
    ageRatingGuide?: string;
    status?: string;
    episodeCount?: number;
    episodeLength?: number;
    startDate?: string;
    endDate?: string;
    showType?: string;
    youtubeVideoId?: string;   
    posterImage?: {
      tiny?: string;
      small?: string;
      medium?: string;
      large?: string;
      original?: string;
    };
    coverImage?: {
      tiny?: string;
      small?: string;
      large?: string;
      original?: string;
    };
  };
  relationships: {
    genres: {
      links: {
        related: string;
      };
    };
    staff: {
      links: {
        related: string;
      };
    };
    characters: {
      links: {
        related: string;
      };
    };
    episodes: {
      links: {
        related: string;
      };
    };
    animeProductions: {
      links: {
        related: string;
      };
    };
  };
}
