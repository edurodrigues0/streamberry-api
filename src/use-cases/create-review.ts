import { MoviesRepository } from "@/repositories/movies-repository";
import { ReviewsRepository } from "@/repositories/reviews-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Review } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface CreateReviewUseCaseRequest {
  rating: number
  comment?: string
  userId: string
  movieId: string
}

interface CreateReviewUseCaseResponse {
  review: Review
}

export class CreateReviewUseCase {
  constructor (
    private reviewsRepository: ReviewsRepository,
    private usersRepository: UsersRepository,
    private moviesRepository: MoviesRepository,
  ) {}

  async execute({
    rating,
    comment,
    movieId,
    userId,
  }: CreateReviewUseCaseRequest): Promise<CreateReviewUseCaseResponse> {
    const movieExisist = await this.moviesRepository.findById(movieId)
    const userExisist = await this.usersRepository.findById(userId)

    if(!movieExisist || !userExisist) {
      throw new ResourceNotFoundError()
    }

    const review = await this.reviewsRepository.create({
      rating,
      comment,
      movieId: movieExisist.id,
      userId: userExisist.id,    
    })

    return {
      review
    }
  }
}