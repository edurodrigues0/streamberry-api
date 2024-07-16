import { FastifyInstance } from "fastify";
import { createReview } from "../controllers/create-review.controller";
import { z } from "zod";
import { verifyJwt } from "../middlewares/verify-jwt";


export async function ReviewsRoutes(app: FastifyInstance) {
  app.post(
    '/reviews/:movieId',
    {
      onRequest: [verifyJwt],
      schema: {
        summary: 'Create review',
        description: "Create a review on movie, where a user can review each movie",
        tags: ['Reviews'],
        body: z.object({
          rating: z.number().min(0).max(5).describe("5"),
          comment: z.string().optional().describe("Excelente filme!"),
        }),
        params: z.object({
          movieId: z.string().uuid()
        }),
        response: {
          201: z.object({
              review: z.object({
              rating: z.number(),
              comment: z.string().optional(),
              createdAt: z.date(),
              movieId: z.string().uuid(),
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
    createReview
  )
}