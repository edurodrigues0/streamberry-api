import { MoviesRepository } from "@/repositories/movies-repository";
import { describe, beforeEach, expect, it } from "vitest";
import { DeleteMovieUseCase } from "./delete-movie";
import { InMemoryMoviesRepository } from "@/repositories/in-memory/in-memory-movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let moviesRepository: MoviesRepository
let sut: DeleteMovieUseCase

describe("Delete Movie Use Case", async () => {
  beforeEach(async () => {
    moviesRepository = new InMemoryMoviesRepository()
    sut = new DeleteMovieUseCase(moviesRepository)

    await moviesRepository.create({
      id: "movie-01",
      title: "O iluminado",
      releaseDate: new Date("1980-12-25"),
    })
  })

  it("Should be able to delete movie", async () => {
    await sut.execute({
      movieId: "movie-01"
    })

    const movie = await moviesRepository.findById("movie-01")

    expect(movie).toBeNull()
  })

  it("Should not be able to delete movie with wrong id", async () => {
    await expect(() =>
      sut.execute({
        movieId: "movie-02",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})