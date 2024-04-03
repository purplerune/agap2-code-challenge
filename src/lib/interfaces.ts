interface IShowRating {
  average: number;
}
type IEpisodeRating = IShowRating;

interface IShowImage {
  medium: string;
  original: string;
}

export interface IShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  rating: IShowRating;
  image: IShowImage;
  summary: string;
}

export interface IEpisodeFromShow {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  rating: IEpisodeRating;
}
