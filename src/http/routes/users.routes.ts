import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/create-user.controller";
import { z } from "zod";


export async function UsersRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        summary: 'Create user',
        tags: ['Users'],
        body: z.object({
          username: z.string().min(1),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            user_id: z.string().uuid(),
          }),
          409: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    createUser
  )
}