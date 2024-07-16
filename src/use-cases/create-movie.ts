import { Movie } from "@prisma/client";
import { MoviesRepository } from "@/repositories/movies-repository";
import { GenresRepository } from "@/repositories/genres-repository";
import { StreamingsRepository } from "@/repositories/streamings-repository";

interface CreateMovieUseCaseRequest {
  title: string
  releaseDate: Date
  genreIds?: number[]
  streamingIds?: number[]
}

interface CreateMovieUseCaseResponse {
  movie: Movie
}

export class CreateMovieUseCase {
  constructor(
    private moviesRepository: MoviesRepository,
    private genresRepository: GenresRepository,
    private streamingsRepository: StreamingsRepository,
  ) {}

  async execute({
    title,
    releaseDate,
    genreIds,
    streamingIds,
  }: CreateMovieUseCaseRequest): Promise<CreateMovieUseCaseResponse> {
    const genres = await this.genresRepository.findByIds(genreIds)
    const streamings = await this.streamingsRepository.findByIds(streamingIds)

    const movie = await this.moviesRepository.create({
      title,
      releaseDate,
      genres: {
        connect: genres?.map((genre) => ({ id: genre.id }))
      },
      streamings: {
        connect: streamings?.map((streaming) => ({ id: streaming.id}))
      }
    })

    return {
      movie,
    }
  }
}