import { z } from "zod";

import { FastifyInstance } from "fastify";
import { fetchGenres } from "../controllers/fetch-genres.controller";

export async function GenresRoutes(app: FastifyInstance) {
  app.get(
    '/genres',
    {
      schema: {
        security: [{}],
        summary: 'Fetch genres',
        tags: ['Genres'],
        response: {
          200: z.object({
            genres: z.array(z.string())
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    fetchGenres
  )
}