import type { UsersRepository } from "../users-repository.ts";
import type { User } from "../../../generated/prisma/browser.ts";
import type { CreateUserRequest } from "../users-repository.ts";
import { UserRole } from "../../../generated/prisma/browser.ts";

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create(data: CreateUserRequest): Promise<User> {
    const user = {
      id: crypto.randomUUID(),
      ...data,
      userRole: UserRole.USER,
      created_at: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async findByWhatsapp(whatsapp: string): Promise<User | null> {
    const user = this.users.find((user) => user.whatsapp === whatsapp);
    return user || null;
  }
}
