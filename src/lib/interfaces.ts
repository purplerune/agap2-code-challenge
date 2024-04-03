interface IShowRating {
  average: number;
}
interface IShowImage {
  medium: string;
  original: string;
}
interface IEmbedded {
  episodes: IEpisodeFromShow[];
}

type IEpisodeRating = IShowRating;
type IEpisodeImage = IShowImage;
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
  _embedded: IEmbedded;
}
export interface IEpisodeFromShow {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  runtime: number;
  rating: IEpisodeRating;
  image: IEpisodeImage;
  summary: string;
}
