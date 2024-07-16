import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeDeleteMovieUseCase } from "@/use-cases/factories/make-delete-movie-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteMovie(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    movieId: z.string().uuid(),
  })

  const { movieId } = getParamsSchema.parse(request.params)

  try {
    const deleteMovieUseCase = makeDeleteMovieUseCase()

    await deleteMovieUseCase.execute({ movieId })

    return reply.status(200).send()
  } catch(error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}