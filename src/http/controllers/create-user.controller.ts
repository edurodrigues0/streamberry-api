import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { username, email, password } = createBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    const { user } = await createUserUseCase.execute({
      username,
      email,
      password
    })

    return reply.status(201).send({
      user_id: user.id
    })
  } catch(error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}