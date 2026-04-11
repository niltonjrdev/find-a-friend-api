import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository.ts";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository.ts";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city.ts";
import { PetSize, PetEnergy } from "../../generated/prisma/enums.ts";

describe("FetchPetsByCityUseCase", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;

  let sut: FetchPetsByCityUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);

    sut = new FetchPetsByCityUseCase(petsRepository);
  });

  it("should be able to fetch pets by city", async () => {
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

    await petsRepository.create(petData);

    const pets = await sut.execute({ city: "Dog City" });

    expect(pets).toHaveLength(1);
    expect(pets[0].name).toBe(petData.name);
    expect(pets[0].age).toBe(petData.age);
    expect(pets[0].size).toBe(petData.size);
    expect(pets[0].energy).toBe(petData.energy);
    expect(pets[0].description).toBe(petData.description);
  });

  it("should return an empty array if no pets are found in the city", async () => {
    const pets = await sut.execute({ city: "Nonexistent City" });

    expect(pets).toHaveLength(0);
  });

  it("should be able to fetch multiple pets by city", async () => {
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

    await petsRepository.create(petData);
    await petsRepository.create({ ...petData, name: "Another Happy Pet" });

    const pets = await sut.execute({ city: "Dog City" });

    expect(pets).toHaveLength(2);
    expect(pets[0].name).toBe(petData.name);
    expect(pets[1].name).toBe("Another Happy Pet");
  });

  it("should only return pets from the searched city", async () => {
    const orgData1 = {
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

    const orgData2 = {
      name: "Happy Org2",
      email: "happyorg2@email.com",
      password_hash: "654321",
      whatsapp: "11988888888",
      address: "Happy Cat St.",
      number: "100",
      city: "Dog Cat",
      uf: "CA",
      latitude: -24.68698429708608,
      longitude: -47.70378601250786,
    };

    const org1 = await orgsRepository.create(orgData1);
    const org2 = await orgsRepository.create(orgData2);

    await petsRepository.create({ name: "Pet 1", ongId: org1.id });
    await petsRepository.create({ name: "Pet 2", ongId: org2.id });

    const pets = await sut.execute({ city: "Dog City" });

    expect(pets).toHaveLength(1);
    expect(pets[0].name).toBe("Pet 1");
  });

  it("should be able to fetch pets by filters", async () => {
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

    const petData1 = {
      name: "Happy Dog",
      age: "2",
      size: PetSize.MEDIUM,
      energy: PetEnergy.HIGH,
      description: "A happy energetic dog",
      ongId: org.id,
    };

    const petData2 = {
      name: "Happy Cat",
      age: "3",
      size: PetSize.SMALL,
      energy: PetEnergy.LOW,
      description: "A happy little cat",
      ongId: org.id,
    };

    await petsRepository.create(petData1);
    await petsRepository.create(petData2);

    const pets = await sut.execute({
      city: "Dog City",
      size: PetSize.SMALL,
      energy: PetEnergy.LOW,
    });

    expect(pets).toHaveLength(1);
    expect(pets[0].name).toBe(petData2.name);
  });
});
