import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from "bcryptjs"

import { CreateUserUseCase } from "./create-user"

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExists } from './errors/user-already-exists'

let usersRepository: UsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('Should be able create a user', async () => {
    const { user } = await sut.execute({
      username: 'Eduardo Rodrigues',
      email: 'eduardo@example.com',
      password: '123456'
    })

    expect(user.email).toEqual('eduardo@example.com')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should be hash user password upon register', async () => {
    const { user } = await sut.execute({
      username: 'Eduardo Rodrigues',
      email: 'eduardo@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'eduardo@example.com'

    await sut.execute({
      username: 'Eduardo Rodrigues',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        username: 'Eduardo Rodrigues',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})