import { Movie } from "@prisma/client";
import { MoviesRepository } from "@/repositories/movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface DeleteMovieUseCaseRequest {
  movieId: string
}

export class DeleteMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    movieId
  }: DeleteMovieUseCaseRequest): Promise<void> {
    const movie = await this.moviesRepository.findById(movieId)

    if(!movie) {
      throw new ResourceNotFoundError()
    }

    await this.moviesRepository.delete(movie.id)

    return
  }
}