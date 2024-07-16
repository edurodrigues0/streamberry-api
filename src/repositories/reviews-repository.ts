import { Prisma, Review, } from "@prisma/client";

export interface ReviewsRepository {
  create(data: Prisma.ReviewUncheckedCreateInput): Promise<Review>;
}