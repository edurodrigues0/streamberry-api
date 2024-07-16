import { PaginationDTO } from "@/dtos/paginationDTO";
import { Prisma, Movie } from "@prisma/client";

export interface MovieFilters {
  genre?: string
  releaseYear?: number
}

export interface MoviesRepository {
  create(data: Prisma.MovieUncheckedCreateInput): Promise<Movie>;
  update(movieId: string, data: Prisma.MovieUncheckedUpdateInput): Promise<Movie>;
  findById(id: string): Promise<Movie | null>;
  fetch(page: number, filters?: MovieFilters): Promise<PaginationDTO>;
  delete(movieId: string): Promise<void>;
}