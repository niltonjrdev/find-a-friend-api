import type { User } from "../../generated/prisma/browser.ts";

export interface CreateUserRequest {
  name: string;
  email: string;
  password_hash: string;
  whatsapp: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
}

export interface UsersRepository {
  create(data: CreateUserRequest): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByWhatsapp(whatsapp: string): Promise<User | null>;
}
