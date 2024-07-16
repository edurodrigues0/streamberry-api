import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMoviesRepository } from '@/repositories/in-memory/in-memory-movies-repository'
import { FetchMoviesUseCase } from './fetch-movies'

let moviesRepository: InMemoryMoviesRepository
let sut: FetchMoviesUseCase

describe('Fetch Movie Use Case', async () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository()
    sut = new FetchMoviesUseCase(moviesRepository)

    for(let i = 1; i <= 22; i++) {
      await moviesRepository.create({
        id: `movie-id-${i}`,
        title: `movie-title-${i}`,
        releaseDate: new Date()
      })
    }
  })

  it('should be able to fetch movie', async () => {
    const { pagination } = await sut.execute({
      page: 2,
    })

    expect(pagination.items).toHaveLength(2)
  })
})