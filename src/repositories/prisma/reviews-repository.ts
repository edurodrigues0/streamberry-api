import { Prisma, Review } from "@prisma/client";
import { ReviewsRepository } from "../reviews-repository";
import { prisma } from "@/lib/prisma";

export class PrismaReviewsRepository implements ReviewsRepository {
  async create(data: Prisma.ReviewUncheckedCreateInput): Promise<Review> {
    const review = await prisma.review.create({
      data,
    })

    return review
  }
}