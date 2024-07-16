import { Genre, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { GenresRepository } from "../genres-repository";

export class PrismaGenresRepository implements GenresRepository {
  async create(data: Prisma.GenreUncheckedCreateInput): Promise<Genre> {
    const genre = await prisma.genre.create({
      data,
    })
    
    return genre
  }

  async findByIds(ids: number[]): Promise<Genre[] | null> {
    const genres = await prisma.genre.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return genres
  }

  async fetch(): Promise<Genre[]> {
    const genres = await prisma.genre.findMany()

    return genres
  }
}