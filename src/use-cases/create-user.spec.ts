import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.ts";
import { CreateUserUseCase } from "./create-user.ts";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.ts";

describe("CreateUserUseCase", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const userData = {
      name: "Abby Boom",
      email: "abbyboom@example.com",
      password_hash: "123456",
      whatsapp: "11987561234",
      city: "Sidney",
      uf: "TC",
      latitude: -23.68,
      longitude: -46.7,
    };

    const user = await sut.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password_hash).not.toBe(userData.password_hash);
  });

  it("should not be able to create a user with an existing email", async () => {
    const userData = {
      name: "Abby Boom",
      email: "abbyboom@example.com",
      password_hash: "123456",
      whatsapp: "11987561234",
      city: "Sidney",
      uf: "TC",
      latitude: -23.68,
      longitude: -46.7,
    };
    await sut.execute(userData);

    const userData2 = {
      name: "Samantha Walsh",
      email: "abbyboom@example.com",
      password_hash: "654321",
      whatsapp: "11932165498",
      city: "Texas",
      uf: "US",
      latitude: -25.68,
      longitude: -47.7,
    };
    await expect(() => sut.execute(userData2)).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
