import { PaginationDTO } from "@/dtos/paginationDTO";
import { MovieFilters, MoviesRepository } from "@/repositories/movies-repository";

interface FetchMoviesUseCaseRequest {
  page: number
  filters?: MovieFilters
}

interface FetchMoviesUseCaseResponse {
  pagination: PaginationDTO
}

export class FetchMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    page,
    filters,
  }: FetchMoviesUseCaseRequest): Promise<FetchMoviesUseCaseResponse> {
    const pagination = await this.moviesRepository.fetch(page, filters)

    return {
      pagination,
    }
  }
}