import { z } from "zod";

import { FastifyInstance } from "fastify";
import { authenticate } from "../controllers/authenticate.controller";
import { refresh } from "../controllers/refresh.controller";

export async function AuthRoutes(app: FastifyInstance) {
  app.post(
    '/auth/login',
    {
      schema: {
        security: [{}],
        summary: 'Create session',
        description: "email: johndoe@example.com, password: 123456",
        tags: ['Authenticate'],
        body: z.object({
          email: z.string().email().describe("johndoe@example.com"),
          password: z.string().describe("123456"),
        }),
        response: {
          201: z.object({
            token: z.string(),
            user_id: z.string().uuid(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    authenticate
  )

  app.patch(
    '/auth/refresh',
    {
      schema: {
        summary: 'Refresh session',
        tags: ['Authenticate'],
        response: {
          200: z.object({
            token: z.string(),
          }),
          500: z.object({
            message: z.string(),
          })
        }
      }
    },
    refresh
  )
}