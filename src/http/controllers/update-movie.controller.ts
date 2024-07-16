import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeGetMovieUseCase } from "@/use-cases/factories/make-get-user-use-case";
import { makeUpdateMovieUseCase } from "@/use-cases/factories/make-update-movie-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateMovie(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.user)

  const getParamsSchema = z.object({
    movieId: z.string().uuid(),
  })

  const updateMovieBodySchema = z.object({
    title: z.string().min(1).optional(),
    releaseDate: z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, "Deve ser uma data válida").transform((value) => new Date(value)).optional(),
    genreIds: z.array(z.number()).optional(),
    streamingIds: z.array(z.number()).optional(),
  })

  const { movieId } = getParamsSchema.parse(request.params)
  const {
    title,
    releaseDate,
    genreIds,
    streamingIds,
  } = updateMovieBodySchema.parse(request.body)

  try {
    const updateMovieUseCase = makeUpdateMovieUseCase()

    const { movie } = await updateMovieUseCase.execute(
      {
        movieId,
        genreIds,
        streamingIds,
        data: {
          title,
          releaseDate,
        }
      }
    )

    return reply.status(200).send({ movie })
  } catch(error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send()
  }
}