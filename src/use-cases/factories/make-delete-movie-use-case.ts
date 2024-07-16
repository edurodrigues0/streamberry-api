import { PrismaMoviesRepository } from "@/repositories/prisma/movies-repository";
import { DeleteMovieUseCase } from "../delete-movie";

export function makeDeleteMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const useCase = new DeleteMovieUseCase(moviesRepository)

  return useCase
}