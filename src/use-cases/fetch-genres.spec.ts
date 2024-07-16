import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGenresRepository } from '@/repositories/in-memory/in-memory-genres-repository'
import { FetchGenresUseCase } from './fetch-genres'

let genresRepository: InMemoryGenresRepository
let sut: FetchGenresUseCase

describe('Fetch Genres Use Case', async () => {
  beforeEach(async () => {
    genresRepository = new InMemoryGenresRepository()
    sut = new FetchGenresUseCase(genresRepository)
    
    for (let i = 1; i <= 5; i++) {
      await genresRepository.create({
        name: `Genre ${i}`
      })
    }
  })

  it('should be able to fetch genres', async () => {
    const { genres } = await sut.execute()

    expect(genres).toHaveLength(5)
  })
})