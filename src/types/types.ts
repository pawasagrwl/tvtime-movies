export interface Movie {
  uuid: string;
  type: string;
  entity_type: string;
  meta: {
    fanart: {
      comment: string;
      favorite_count: number;
      height: number;
      lang: string;
      thumb_url: string;
      type: string;
      url: string;
      uuid: string;
      width: number;
    }[];
    first_release_date: string;
    genres: string[];
    is_released: boolean;
    language: string;
    name: string;
    overview: string;
    posters: {
      comment: string;
      favorite_count: number;
      height: number;
      lang: string;
      thumb_url: string;
      type: string;
      url: string;
      uuid: string;
      width: number;
    }[];
    release_dates: string[];
    runtime: number;
    trailers: {
      embeddable: boolean;
      is_featured: boolean;
      name: string;
      runtime: number;
      thumb_url: string;
      type: string;
      url: string;
      uuid: string;
    }[];
    type: string;
    updated_at: string;
    uuid: string;
    series_info?: {
      series_name: string;
      series_id: number;
    } | null;
    keywords: string[];
    original_language: string;
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

export interface MovieItemProps {
  uuid: string;
  name: string;
  releaseDate: string;
  runtime: number;
  posterUrl?: string;
  genres: string[];
  overview: string;
  trailers?: { name: string; url: string; thumb_url: string }[];
  meta: Movie["meta"];
  extended: Movie["extended"];
}

export interface MovieModalProps {
  open: boolean;
  onClose: () => void;
  movie: {
    uuid: string;
    name: string;
    releaseDate: string;
    runtime: number;
    posterUrl?: string;
    genres: string[];
    overview: string;
    trailers?: { name: string; url: string; thumb_url: string }[];
    meta: Movie["meta"];
    extended: Movie["extended"];
  };
}
