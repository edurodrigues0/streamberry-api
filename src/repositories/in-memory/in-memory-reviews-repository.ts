import { Prisma, Review } from "@prisma/client";
import { ReviewsRepository } from "../reviews-repository";
import { randomInt } from "crypto";

export class InMemoryReviewsRepository implements ReviewsRepository {
  public items: Review[] = []
  
  async create(data: Prisma.ReviewUncheckedCreateInput): Promise<Review> {
    const review: Review = {
      id: data.id ?? randomInt(100),
      rating: data.rating,
      comment: data.comment ?? null,
      movieId: data.movieId,
      userId: data.userId,
      createdAt: new Date(),
    }

    this.items.push(review)

    return review
  }
}