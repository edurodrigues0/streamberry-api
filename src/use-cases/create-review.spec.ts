import { beforeEach, describe, expect, it } from 'vitest'

import { MoviesRepository } from "@/repositories/movies-repository"
import { InMemoryMoviesRepository } from '@/repositories/in-memory/in-memory-movies-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ReviewsRepository } from '@/repositories/reviews-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryReviewsRepository } from '@/repositories/in-memory/in-memory-reviews-repository'
import { CreateReviewUseCase } from './create-review'
import { ResourceNotFoundError } from './errors/resource-not-found'

let moviesRepository: MoviesRepository
let usersRepository: UsersRepository
let reviewsRepository: ReviewsRepository
let sut: CreateReviewUseCase

describe('Create Review Use Case', () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository()
    usersRepository = new InMemoryUsersRepository()
    reviewsRepository = new InMemoryReviewsRepository()

    sut = new CreateReviewUseCase(
      reviewsRepository,
      usersRepository,
      moviesRepository,
    )

    await usersRepository.create({
      id: "user-01",
      username: "Eduardo Rodrigues",
      email: "eduardo@example.com",
      password: "123456",
    })

    await moviesRepository.create({
      id: "movie-01",
      title: "O iluminado",
      releaseDate: "1980-12-25",
    })
  })

  it('Should be able create a review', async () => {
    const { review } = await sut.execute({
      rating: 5,
      comment: "Excelente filme!",
      movieId: "movie-01",
      userId: "user-01",
    })  

    expect(review).toEqual(expect.objectContaining({
      rating: 5,
      comment: "Excelente filme!",
      movieId: "movie-01",
      userId: "user-01",
    }))
  })

  it('Should not be able make a review with user id or movie id incorrect', async () => {
    await expect(() =>
      sut.execute({
        movieId: "wrong-id",
        userId: "wrong-id",
        rating: 5,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})