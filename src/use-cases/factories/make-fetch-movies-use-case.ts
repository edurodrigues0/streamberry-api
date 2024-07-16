import { FetchMoviesUseCase } from "../fetch-movies";
import { PrismaMoviesRepository } from "@/repositories/prisma/movies-repository";

export function makeFetchMoviesUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const useCase = new FetchMoviesUseCase(moviesRepository)

  return useCase
}