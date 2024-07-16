import { Genre } from "@prisma/client";

export function genrePresenter(genre: Genre) {
  const { name } = genre
  return name
}