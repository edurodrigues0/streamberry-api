import { GenresRepository } from "@/repositories/genres-repository";
import { Genre } from "@prisma/client";

interface FetchGenresUseCaseResponse {
  genres: Genre[]
}

export class FetchGenresUseCase {
  constructor(private genresRepository: GenresRepository) {}

  async execute(): Promise<FetchGenresUseCaseResponse> {
    const genres = await this.genresRepository.fetch()

    return {
      genres
    }
  }
}