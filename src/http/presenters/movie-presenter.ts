import { Movie as PrismaMovieProps } from "@prisma/client"

export interface Movie extends PrismaMovieProps {
  genres: [{
    name: string
  }]
  streamings: [{
    name: string
  }],
  reviews: [{
    id: number,
    rating: number
    comment: string
    createdAt: Date
  }]
}

export function movieGetPresenter(movie: Movie) {
  return {
    id: movie.id,
    title: movie.title,
    releaseDate: movie.releaseDate,
    genres: movie.genres.map((genre )=> genre.name),
    streamings: movie.streamings.map((streaming) => streaming.name),
    reviews: movie.reviews,
    reviewAverange: movie.reviews.reduce(
      (acc, curr) => acc + curr.rating, 0
    ) / movie.reviews.length
  }
}

export function movieFetchPresenter(movie: Movie) {
  return {
    id: movie.id,
    title: movie.title,
    releaseDate: movie.releaseDate,
    genres: movie.genres.map((genre) => genre.name)
  }
}