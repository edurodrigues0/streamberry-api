import { Genre, Prisma } from "@prisma/client";
import { GenresRepository } from "../genres-repository";
import { randomInt } from "node:crypto";

export class InMemoryGenresRepository implements GenresRepository {
  public items: Genre[] = []

  async create(data: Prisma.GenreUncheckedCreateInput): Promise<Genre> {
    const genre: Genre = {
      id: data.id ?? randomInt(100),
      name: data.name
    }

    this.items.push(genre)

    return genre
  }

  async findByIds(ids: number[]): Promise<Genre[] | null> {
    const genres: Genre[] = []

    if (!ids || ids.length <= 0) {
      return null
    }

    for (const genreId of ids) {
      const genre = this.items.find(item => item.id === genreId)

      if (genre) {
        genres.push(genre)
      }
    }

    return genres
  }

  async fetch(): Promise<Genre[]> {
    const genres = this.items

    return genres
  }
}