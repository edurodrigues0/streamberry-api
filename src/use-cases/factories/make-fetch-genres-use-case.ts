import { PrismaGenresRepository } from "@/repositories/prisma/genres-repository";
import { FetchGenresUseCase } from "../fetch-genres";

export function makeFetchGenres() {
  const genresRepository = new PrismaGenresRepository()
  const useCase = new FetchGenresUseCase(genresRepository)

  return useCase
}