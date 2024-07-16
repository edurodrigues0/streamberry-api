import { FastifyReply, FastifyRequest } from "fastify"

type Role = 'USER' | 'ADMIN'

export function verifyUserRole(allwedRoles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request

    if (!user || !user.role || !allwedRoles.includes(user.role)) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}