import { makeCreateReviewUseCase } from "@/use-cases/factories/make-create-review-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createReview(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const createReviewBodySchema = z.object({
    rating: z.number().min(0).max(5),
    comment: z.string().optional(),
  })

  const createReviewParamsSchema = z.object({
    movieId: z.string().uuid()
  })

  const { rating, comment } = createReviewBodySchema.parse(request.body)
  const { movieId } = createReviewParamsSchema.parse(request.params)

  try {
    const userId = request.user.sign.sub

    console.log("user id", userId)

    const createReviewUseCase = makeCreateReviewUseCase()

    const { review } = await createReviewUseCase.execute({
      rating,
      comment,
      movieId,
      userId,
    })

    console.log("Review:", review)

    return reply.status(201).send({ review })
  } catch(error) {
    
    throw error
  }
}