import { prisma } from "../../lib/prisma.ts";
import type { UsersRepository } from "../users-repository.ts";
import type { User } from "../../../generated/prisma/browser.ts";
import type { CreateUserRequest } from "../users-repository.ts";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserRequest): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByWhatsapp(whatsapp: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        whatsapp,
      },
    });

    return user;
  }
}
