import { makeGetMovieUseCase } from "@/use-cases/factories/make-get-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Movie, movieGetPresenter } from "../presenters/movie-presenter";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";

export async function getMovie(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    movieId: z.string().uuid(),
  })

  const { movieId } = getParamsSchema.parse(request.params)

  try {
    const getMovieUseCase = makeGetMovieUseCase()

    const { movie } = await getMovieUseCase.execute({ movieId })

    return reply.status(200).send({
      movie: movieGetPresenter(movie as Movie)
    })
  } catch(error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}