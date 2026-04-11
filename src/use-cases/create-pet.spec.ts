import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository.ts";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository.ts";
import { PetSize, PetEnergy } from "../../generated/prisma/enums.ts";
import { CreatePetUseCase } from "./create-pet.ts";
import { OrgNotFoundError } from "./errors/org-not-found-error.ts";

describe("CreatePetUseCase", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;

  let sut: CreatePetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);

    sut = new CreatePetUseCase(petsRepository, orgsRepository);
  });

  it("should be able to create a new pet", async () => {
    const orgData = {
      name: "Happy Org",
      email: "happyorg@email.com",
      password_hash: "123456",
      whatsapp: "1199999999",
      address: "Happy Dog St.",
      number: "100",
      city: "Dog City",
      uf: "TC",
      latitude: -23.68698429708608,
      longitude: -46.70378601250786,
    };

    const org = await orgsRepository.create(orgData);

    const petData = {
      name: "Happy Pet",
      age: "2",
      size: PetSize.SMALL,
      energy: PetEnergy.MEDIUM,
      description: "A happy little pet",
      ongId: org.id,
    };

    const pet = await sut.execute(petData);

    expect(pet).toHaveProperty("id");
    expect(pet.name).toBe(petData.name);
    expect(pet.age).toBe(petData.age);
    expect(pet.size).toBe(petData.size);
    expect(pet.energy).toBe(petData.energy);
    expect(pet.description).toBe(petData.description);
  });

  it("should not be able to create a pet with a non-existing org", async () => {
    const petData = {
      name: "Happy Pet",
      age: "2",
      size: PetSize.SMALL,
      energy: PetEnergy.MEDIUM,
      description: "A happy little pet",
      ongId: "non-existing-org-id",
    };

    await expect(() => sut.execute(petData)).rejects.toThrow(OrgNotFoundError);
  });
});
