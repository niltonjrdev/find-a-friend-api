import type { CreateUserRequest, UsersRepository } from "../repositories/users-repository.ts";
import type { User } from "../../generated/prisma/browser.ts";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.ts";

export class CreateUserUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: CreateUserRequest): Promise<User> {
    const passwordHash = await hash(data.password_hash, 6);

    const user = await this.usersRepository.findByEmail(data.email);

    if (user) {
      throw new UserAlreadyExistsError();
    }

    const newUser = await this.usersRepository.create({ ...data, password_hash: passwordHash });

    return newUser;
  }
}
