import { beforeEach, describe, expect, it } from 'vitest'
import { GetMovieUseCase } from './get-movie'
import { InMemoryMoviesRepository } from '@/repositories/in-memory/in-memory-movies-repository'

let moviesRepository: InMemoryMoviesRepository
let sut: GetMovieUseCase

describe('Get Movie Use Case', async () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository()
    sut = new GetMovieUseCase(moviesRepository)

    await moviesRepository.create({
      id: 'movie-01',
      title: 'O iluminado',
      releaseDate: new Date("1980-12-25")
    })
  })

  it('should be able to get movie', async () => {
    const { movie } = await sut.execute({
      movieId: 'movie-01',
    })

    expect(movie).not.toEqual(null)
    expect(movie?.id).toEqual('movie-01')
  })
})