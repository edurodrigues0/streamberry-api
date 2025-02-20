import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(userRepository)

  return useCase
}