import { FastifyInstance } from "fastify";
import { createMovie } from "../controllers/create-movie.controller";
import { getMovie } from "../controllers/get-movie.controller";
import { z } from "zod";
import { fetchMovies } from "../controllers/fetch-movies.controller";
import { deleteMovie } from "../controllers/delete-movie.controller";
import { updateMovie } from "../controllers/update-movie.controller";
import { verifyJwt } from "../middlewares/verify-jwt";
import { verifyUserRole } from "../middlewares/verify-user-role";

export async function MovieRoutes(app: FastifyInstance) {
  app.post(
    '/movies',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
      schema: {
        summary: 'Create movie',
        tags: ['Movies'],
        body: z.object({
          title: z.string().min(1).describe("O iluminado"),
          releaseDate: z.string().date().describe("1980-12-25"),
          genreIds: z.array(z.number()).describe("[1, 2, 3]"),
          streamingIds: z.array(z.number()).describe("[1, 2, 3]")
        }),
        response: {
          201: z.object({
            movie_id: z.string().uuid(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    createMovie
  )

  app.get(
    '/movies/:movieId',
    {
      schema: {
        security: [{}],
        summary: 'Get movie',
        tags: ['Movies'],
        params: z.object({
          movieId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            movie: z.object({
              id: z.string(),
              title: z.string(),
              releaseDate: z.date(),
              genres: z.array(z.string()),
              streamings: z.array(z.string()),
              reviews: z.array(z.object({
                id: z.number(),
                rating: z.number(),
                comment: z.string().nullable(),
                createdAt: z.date(),
              })),
              reviewAverange: z.number(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    getMovie
  );
  
  app.get(
    '/movies',
    {
      schema: {
        security: [{}],
        summary: 'Fetch movies',
        description: "This route is responsible for listing the movies, where it receives the query parameters page, genre, and releaseYear. When searching with the genre and releaseYear parameters, it will return the average rating of all grouped movies.",
        tags: ['Movies'],
        querystring: z.object({
          page: z.coerce.number(),
          genre: z.string().optional(),
          releaseYear: z.coerce.number().optional()
        }),
        response: {
          200: z.object({
            pagination: z.object({
              currentPage: z.number(),
              totalItems: z.number(),
              totalPages: z.number(),
              itemsPerPage: z.number(),
              items: z.array(
                z.object({
                  id: z.string().uuid(),
                  title: z.string(),
                  releaseDate: z.date(),
                  genres: z.array(z.string()),
                })
              ),
              averageRating: z.number().nullable(),
            }),
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    fetchMovies
  );

  app.put(
    '/movies/:movieId',
    {
      onRequest: [verifyJwt],
      schema: {
        summary: 'Update movie',
        tags: ['Movies'],
        params: z.object({
          movieId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(1).optional(),
          releaseDate: z.string().date().optional(),
          genreIds: z.array(z.number()).optional().describe("[1, 2, 3]"),
          streamingIds: z.array(z.number()).optional().describe("[1, 2, 3]")
        }),
        response: {
          200: z.object({
            movie: z.object({
              title: z.string().min(1),
              releaseDate: z.date(),
            })
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    updateMovie
  )

  app.delete(
    '/movies/:movieId',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
      schema: {
        summary: 'Delete movie',
        tags: ['Movies'],
        params: z.object({
          movieId: z.string().uuid(),
        }),
        response: {
          200: z.void(),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          })
        },
      },     
    },
    deleteMovie
  );
}