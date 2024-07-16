import { Movie } from "@prisma/client";
import { MoviesRepository } from "@/repositories/movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetMovieUseCaseRequest {
  movieId: string
}

interface GetMovieUseCaseResponse {
  movie: Movie | null
}

export class GetMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    movieId
  }: GetMovieUseCaseRequest): Promise<GetMovieUseCaseResponse> {
    const movie = await this.moviesRepository.findById(movieId)

    if(!movie) {
      throw new ResourceNotFoundError()
    }

    return {
      movie,
    }
  }
}