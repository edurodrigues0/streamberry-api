import { beforeEach, describe, expect, it } from 'vitest'

import { CreateMovieUseCase } from "./create-movie"

import { MoviesRepository } from "@/repositories/movies-repository"
import { InMemoryMoviesRepository } from '@/repositories/in-memory/in-memory-movies-repository'
import { GenresRepository } from '@/repositories/genres-repository'
import { InMemoryGenresRepository } from '@/repositories/in-memory/in-memory-genres-repository'
import { InMemoryStreamingsRepository } from '@/repositories/in-memory/in-memory-streaming-repository'
import { StreamingsRepository } from '@/repositories/streamings-repository'

let moviesRepository: MoviesRepository
let genresRepository: GenresRepository
let streamingsRepository: StreamingsRepository
let sut: CreateMovieUseCase

describe('Create Movie Use Case', () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository()
    genresRepository = new InMemoryGenresRepository()
    streamingsRepository = new InMemoryStreamingsRepository()

    sut = new CreateMovieUseCase(
      moviesRepository,
      genresRepository,
      streamingsRepository
    )

    await genresRepository.create({
      id: 1,
      name: "Aventura"
    })

    await genresRepository.create({
      id: 2,
      name: "Drama"
    })
  })

  it('Should be able create a movie', async () => {
    const { movie } = await sut.execute({
      title: 'O iluminado',
      releaseDate: new Date("1980-12-25"),
      genreIds: [1, 2]
    })

    expect(movie.title).toEqual('O iluminado')
    expect(movie.id).toEqual(expect.any(String))
  })
})