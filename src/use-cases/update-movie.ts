import { Movie, Prisma } from "@prisma/client";
import { MoviesRepository } from "@/repositories/movies-repository";
import { GenresRepository } from "@/repositories/genres-repository";
import { StreamingsRepository } from "@/repositories/streamings-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface UpdateMovieUseCaseRequest {
  movieId: string
  data: Prisma.MovieUncheckedUpdateInput
  genreIds?: number[]
  streamingIds?: number[]
}

interface UpdateMovieUseCaseResponse {
  movie: Movie
}

export class UpdateMovieUseCase {
  constructor(
    private moviesRepository: MoviesRepository,
    private genresRepository: GenresRepository,
    private streamingsRepository: StreamingsRepository,
  ) {}

  async execute({
    movieId,
    data,
    genreIds,
    streamingIds,
  }: UpdateMovieUseCaseRequest): Promise<UpdateMovieUseCaseResponse> {
    const genres = await this.genresRepository.findByIds(genreIds)
    const streamings = await this.streamingsRepository.findByIds(streamingIds)

    const movie = await this.moviesRepository.findById(movieId)

    if(!movie) {
      throw new ResourceNotFoundError()
    }

    const updatedMovie = await this.moviesRepository.update(movieId, {
      genres: {
        set: genres?.map((genre) => ({ id: genre.id }))
      },
      streamings: {
        set: streamings?.map((streaming) => ({ id: streaming.id }))
      },
      ...data
    })

    return {
      movie: updatedMovie,
    }
  }
}