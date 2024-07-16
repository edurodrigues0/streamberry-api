import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public item: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: data.id ?? randomUUID(),
      role: 'USER',
      username: data.username,
      email: data.email,
      password: data.password,
    }

    this.item.push(user);

    return user
  }

  async findById(id: string) {
    const user = this.item.find((item) => item.id === id)

    if(!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.item.find((item) => item.email === email)

    if(!user) {
      return null
    }

    return user
  }
}