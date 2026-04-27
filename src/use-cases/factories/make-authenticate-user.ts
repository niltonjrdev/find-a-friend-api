import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.ts";
import { AuthenticateUserUseCase } from "../authenticate-user.ts";

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

  return authenticateUserUseCase;
}
