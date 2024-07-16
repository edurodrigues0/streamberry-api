import { PrismaMoviesRepository } from "@/repositories/prisma/movies-repository";
import { CreateMovieUseCase } from "../create-movie";
import { PrismaGenresRepository } from "@/repositories/prisma/genres-repository";
import { PrismaStreamingsRepository } from "@/repositories/prisma/streaming-repository";

export function makeCreateMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const genresRepository = new PrismaGenresRepository()
  const streamingsRepository = new PrismaStreamingsRepository()
  const useCase = new CreateMovieUseCase(
    moviesRepository,
    genresRepository,
    streamingsRepository,
  )

  return useCase
}