import { Prisma, Movie } from "@prisma/client";
import { MovieFilters, MoviesRepository } from "../movies-repository";
import { randomUUID } from "node:crypto";
import { PaginationDTO } from "@/dtos/paginationDTO";

export class InMemoryMoviesRepository implements MoviesRepository {
  public items: Movie[] = []

  async create(data: Prisma.MovieCreateInput) {
    const movie: Movie = {
      id: data.id ?? randomUUID(),
      title: data.title,
      releaseDate: new Date(data.releaseDate),
      createdAt: new Date(),
    }

    this.items.push(movie);

    return movie
  }

  async findById(id: string) {
    const movie = this.items.find((item) => item.id === id)

    if(!movie) {
      return null
    }

    return movie
  }

  async fetch(page: number): Promise<PaginationDTO> {
    const movies = this.items.slice((page - 1) * 20, page * 20)
    const totalItems = movies.length
    const totalPages = Math.ceil(totalItems / 20)
    const itemsPerPage = page === totalPages ? totalPages % 20 : 20

    return {
      currentPage: page,
      totalItems,
      totalPages,
      itemsPerPage,
      items: movies,
      averageRating: 0,
    }
  }

  async update(movieId: string, data: Prisma.MovieUncheckedUpdateInput) {
    const index = this.items.findIndex((item) => item.id === movieId)

    const movie = {...this.items[index], ...data} as Movie

    return movie
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id)

    if (index > -1) {
      this.items.splice(index, 1)
    }
  }
}