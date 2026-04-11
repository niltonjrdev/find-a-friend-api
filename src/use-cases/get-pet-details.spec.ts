import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository.ts";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository.ts";
import { GetPetDetailsUseCase } from "./get-pet-details.ts";
import { PetSize, PetEnergy } from "../../generated/prisma/enums.ts";
import { PetNotFoundError } from "./errors/pet-not-found-error.ts";

describe("GetPetDetailsUseCase", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;

  let sut: GetPetDetailsUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);

    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get pet details", async () => {
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

    const createdPet = await petsRepository.create(petData);

    const pet = await sut.execute({ petId: createdPet.id });

    expect(pet).not.toBeNull();
    expect(pet?.name).toBe(petData.name);
    expect(pet?.age).toBe(petData.age);
    expect(pet?.size).toBe(petData.size);
    expect(pet?.energy).toBe(petData.energy);
    expect(pet?.description).toBe(petData.description);
  });

  it("should not be able to get details of a non-existing pet", async () => {
    await expect(() => sut.execute({ petId: "invalid-id" })).rejects.toThrow(PetNotFoundError);
  });
});
