import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepository } from '@/repositories/users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let usersRepository: UsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      username: 'Eduardo',
      email: 'eduardo@example.com',
      password: await hash('123456', 8),
    })

    const { user } = await sut.execute({
      email: 'eduardo@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await usersRepository.create({
      username: 'Eduardo',
      email: 'eduardo@example.com',
      password: await hash('123456', 8),
    })

    await expect(() =>
      sut.execute({
        email: 'wrong-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

    await expect(() =>
      sut.execute({
        email: 'eduardo@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})