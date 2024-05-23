export interface Movie {
  uuid: string;
  type: string;
  entity_type: string;
  created_at: string;
  updated_at: string;
  watched_at: string;
  meta: {
    character_order: string;
    characters: any[];
    created_at: string;
    external_sources: { id: string; source: string; type: string }[];
    fanart: { comment: string; favorite_count: number; height: number; lang: string; thumb_url: string; type: string; url: string; uuid: string; width: number }[];
    filter: string[];
    first_release_date: string;
    follower_count: number;
    franchise: { name: string; type: string; uuid: string };
    genres: string[];
    is_released: boolean;
    language: string;
    name: string;
    overview: string;
    position_in_franchise: number;
    posters: { comment: string; favorite_count: number; height: number; lang: string; thumb_url: string; type: string; url: string; uuid: string; width: number }[];
    release_dates: any[];
    runtime: number;
    sorting: any | null;
    status: string;
    tagline: string;
    trailers: { embeddable: boolean; is_featured: boolean; name: string; runtime: number; thumb_url: string; type: string; url: string; uuid: string }[];
    translations: any[];
    type: string;
    updated_at: string;
    uuid: string;
  };
  extended: {
    rating_count: number;
    rating: number;
    comment_count: number;
    follower_count: number;
    is_watched: boolean;
  };
}


export interface MovieListProps {
  filter: (movie: Movie) => boolean;
  sort: { criteria: string; order: "asc" | "desc" };
}

