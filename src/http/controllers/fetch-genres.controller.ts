import { makeFetchGenres } from "@/use-cases/factories/make-fetch-genres-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { genrePresenter } from "../presenters/genre-presenter";

export async function fetchGenres(_request: FastifyRequest, reply: FastifyReply) {
  const fetchGenresUseCase = makeFetchGenres()

  const { genres } = await fetchGenresUseCase.execute()

  return reply.status(200).send({
    genres: genres.map(genre => genrePresenter(genre))
  })
}