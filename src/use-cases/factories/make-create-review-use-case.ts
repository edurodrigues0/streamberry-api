import { CreateReviewUseCase } from "../create-review";

import { PrismaMoviesRepository } from "@/repositories/prisma/movies-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { PrismaReviewsRepository } from "@/repositories/prisma/reviews-repository";

export function makeCreateReviewUseCase() {
  const reviewsRepository = new PrismaReviewsRepository()
  const usersRepository = new PrismaUsersRepository()
  const moviesRepository = new PrismaMoviesRepository()

  const useCase = new CreateReviewUseCase(
    reviewsRepository,
    usersRepository,
    moviesRepository,
  )

  return useCase
}