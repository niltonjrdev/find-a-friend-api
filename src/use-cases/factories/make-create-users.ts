import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.ts";
import { CreateUserUseCase } from "../create-user.ts";

export function makeCreateUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
