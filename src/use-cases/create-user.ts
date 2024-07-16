import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists";

interface CreateUserUseCaseRequest {
  username: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
    password
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if(userWithSameEmail) {
      throw new UserAlreadyExists(); // Retornar erro semantico;
    }

    const user = await this.usersRepository.create({
      username,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}