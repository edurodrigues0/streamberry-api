import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMoviesRepository } from '@/repositories/in-memory/in-memory-movies-repository'
import { UpdateMovieUseCase } from './update-movie'
import { InMemoryGenresRepository } from '@/repositories/in-memory/in-memory-genres-repository'
import { InMemoryStreamingsRepository } from '@/repositories/in-memory/in-memory-streaming-repository'


let moviesRepository: InMemoryMoviesRepository
let genresRepository: InMemoryGenresRepository
let streamingsRepository: InMemoryStreamingsRepository
let sut: UpdateMovieUseCase

describe('Updated Movie Use Case', async () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository()
    genresRepository = new InMemoryGenresRepository()
    streamingsRepository = new InMemoryStreamingsRepository()

    sut = new UpdateMovieUseCase(
      moviesRepository,
      genresRepository,
      streamingsRepository,
    )

    await genresRepository.create({
      id: 2,
      name: "Drama",
    })

    await moviesRepository.create({
      id: 'movie-01',
      title: 'wrong-title',
      releaseDate: new Date("1980-12-25"),
      genres: {
        create: {
          id: 1,
          name: "Aventura",
        }
      }
    })
  })

  it('should be able to updated movie', async () => {
    const { movie } = await sut.execute({
      movieId: 'movie-01',
      genreIds: [2],
      data: {
        title: 'O iluminado' 
      }
    })

    expect(movie).not.toEqual(null)
    expect(movie.title).toEqual('O iluminado')
  })
})