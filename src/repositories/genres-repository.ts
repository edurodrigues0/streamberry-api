import { Prisma, Genre } from "@prisma/client";

export interface GenresRepository {
  create(data: Prisma.GenreUncheckedCreateInput): Promise<Genre>;
  findByIds(ids?: number[]): Promise<Genre[] | null>;
  fetch(): Promise<Genre[]>;
}