export interface GenreModel {
  id: number;
  name?: string;
}

export interface GenresModel {
  genres: GenreModel[];
}