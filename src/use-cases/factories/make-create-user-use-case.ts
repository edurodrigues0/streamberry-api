import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new CreateUserUseCase(userRepository)

  return useCase
}