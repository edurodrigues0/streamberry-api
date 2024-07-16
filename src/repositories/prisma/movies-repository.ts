import { Prisma, Movie } from "@prisma/client";
import { MovieFilters, MoviesRepository } from "../movies-repository";
import { prisma } from "@/lib/prisma";
import { PaginationDTO } from "@/dtos/paginationDTO";

export class PrismaMoviesRepository implements MoviesRepository {
  async create(data: Prisma.MovieUncheckedCreateInput): Promise<Movie> {
    const movie = await prisma.movie.create({
      data,
    })

    return movie
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
          }
        },
        genres: {
          select: {
            name: true,
          }
        },
        streamings: {
          select: {
            name: true,
          }
        }
      },
      where: {
        id,
      }
    })

    return movie
  }

  async fetch(page: number, filters: MovieFilters): Promise<PaginationDTO> {
    const { genre, releaseYear } = filters || {}
    let averageRating = 0

    const where: Prisma.MovieWhereInput = {}

    if (genre) {
      where.genres = {
        some: {
          name: {
            contains: genre
          },
        },
      }
    }

    if (releaseYear) {
      const startDate = new Date(releaseYear, 0, 1)
      const endDate = new Date(releaseYear, 11, 31)

      where.releaseDate = {
        gte: startDate,
        lte: endDate
      }

      const movies = await prisma.movie.findMany({
        where,
        include: {
          reviews: true,
        }
      })

      const totalRatingSum = movies.reduce((sum, movie) => {
        const movieRatingSum = movie.reviews.reduce((movieSum, review) => movieSum + review.rating, 0);
        return sum + movieRatingSum;
      }, 0);

      const totalReviewCount = 
        movies.reduce(
          (count, movie) => 
            count + movie.reviews.length, 0
      )
    
      averageRating = 
        totalReviewCount > 
        0 ? 
        totalRatingSum / 
        totalReviewCount : 0
    }

    const movies = await prisma.movie.findMany({
      where,
      include: {
        genres: {
          select: {
            name: true
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    const totalItems = await prisma.movie.count({
      where
    })

    const totalPages = Math.ceil(totalItems / 20)
    const itemsPerPage = page === totalPages ? totalItems % 20 : 20

    return {
      currentPage: page,
      totalItems,
      totalPages,
      itemsPerPage,
      items: movies,
      averageRating: averageRating > 0 ? averageRating : null
    }
  }

  async update(movieId: string, data: Prisma.MovieUncheckedUpdateInput): Promise<Movie> {
    const movie = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data,
    })

    return movie
  }

  async delete(movieId: string): Promise<void> {
    await prisma.movie.delete({
      where: {
        id: movieId,
      }
    })
  }
}