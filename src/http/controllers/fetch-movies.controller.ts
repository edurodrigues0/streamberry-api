import { PaginationDTO } from "@/dtos/paginationDTO";
import { makeFetchMoviesUseCase } from "@/use-cases/factories/make-fetch-movies-use-case";
import { makeGetMovieUseCase } from "@/use-cases/factories/make-get-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { movieFetchPresenter } from "../presenters/movie-presenter";

export async function fetchMovies(request: FastifyRequest, reply: FastifyReply) {
  const fetchQuerySchema = z.object({
    page: z.coerce.number().default(1),
    genre: z.string().optional(),
    releaseYear: z.coerce.number().optional(),
  })

  const { page, genre, releaseYear } = fetchQuerySchema.parse(request.query)

  try {
    const fetchMoviesUseCase = makeFetchMoviesUseCase()

    const { pagination } = await fetchMoviesUseCase.execute({ page, filters: { genre, releaseYear } })

    return reply.status(200).send({ pagination: <PaginationDTO>{
      ...pagination,
      items: pagination.items.map((item) => movieFetchPresenter(item))
    } })
  } catch(error) {
    
    throw error
  }
}