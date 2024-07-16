import { PrismaGenresRepository } from "@/repositories/prisma/genres-repository";
import { UpdateMovieUseCase } from "../update-movie";
import { PrismaMoviesRepository } from "@/repositories/prisma/movies-repository";
import { PrismaStreamingsRepository } from "@/repositories/prisma/streaming-repository";

export function makeUpdateMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const genresRepository = new PrismaGenresRepository()
  const streamingsRepository = new PrismaStreamingsRepository()

  const useCase = new UpdateMovieUseCase(
    moviesRepository,
    genresRepository,
    streamingsRepository,
  )

  return useCase
}