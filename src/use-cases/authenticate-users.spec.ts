import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.ts";
import { AuthenticateUserUseCase } from "./authenticate-user.ts";
import { CreateUserUseCase } from "./create-user.ts";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.ts";

describe("AuthenticateUserUseCase", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(usersRepository);
  });

  it("should be able to authenticate a user", async () => {
    const createUserUseCase = new CreateUserUseCase(usersRepository);
    await createUserUseCase.execute({
      name: "Abby Boom",
      email: "abbyboom@example.com",
      password_hash: "123456",
      whatsapp: "11987561234",
      city: "Sidney",
      uf: "TC",
      latitude: -23.68,
      longitude: -46.7,
    });

    const { user } = await sut.execute({
      email: "abbyboom@example.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("abbyboom@example.com");
    expect(user.password_hash).not.toBe("123456");
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "abyyboom@example.com",
        password: "123456",
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const createUserUseCase = new CreateUserUseCase(usersRepository);
    await createUserUseCase.execute({
      name: "Abby Boom",
      email: "abbyboom@example.com",
      password_hash: "123456",
      whatsapp: "11987561234",
      city: "Sidney",
      uf: "TC",
      latitude: -23.68,
      longitude: -46.7,
    });

    await expect(() =>
      sut.execute({
        email: "abbyboom@example.com",
        password: "000000",
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
