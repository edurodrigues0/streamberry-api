import { makeCreateMovieUseCase } from "@/use-cases/factories/make-create-movie-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMovie(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string().min(1),
    releaseDate: z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, "Deve ser uma data válida").transform((value) => new Date(value)),
    genreIds: z.array(z.number()),
    streamingIds: z.array(z.number()),
  })

  const { title, releaseDate, genreIds, streamingIds } = createBodySchema.parse(request.body)

  try {
    const createMovieUseCase = makeCreateMovieUseCase()

    const { movie } = await createMovieUseCase.execute({
      title,
      releaseDate,
      genreIds,
      streamingIds,
    })

    return reply.status(201).send({
      movie_id: movie.id
    })
  } catch(error) {
    
    throw error
  }
}