import { GetMovieUseCase } from "../get-movie";
import { PrismaMoviesRepository } from "@/repositories/prisma/movies-repository";

export function makeGetMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const useCase = new GetMovieUseCase(moviesRepository)

  return useCase
}