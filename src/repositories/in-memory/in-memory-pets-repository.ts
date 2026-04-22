import type { PetsRepository, CreatePetRequest, FetchPetsByCityRequest } from "../pets-repository.ts";
import type { Pet } from "../../../generated/prisma/client.ts";
import type { InMemoryOrgsRepository } from "./in-memory-orgs-repository.ts";

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = [];
  orgsRepository: InMemoryOrgsRepository;

  constructor(orgsRepository: InMemoryOrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async create(data: CreatePetRequest): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
      name: data.name ?? null,
      age: data.age ?? null,
      description: data.description ?? null,
      type: data.type ?? null,
      size: data.size ?? null,
      energy: data.energy ?? null,
      created_at: new Date(),
    };

    this.pets.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id);
    return pet || null;
  }

  async findManyByOngCity(filter: FetchPetsByCityRequest): Promise<Pet[]> {
    const orgsInCity = await Promise.all(this.pets.map((pet) => this.orgsRepository.findById(pet.ongId)));

    return this.pets.filter((pet, index) => {
      const org = orgsInCity[index];
      if (!org || org.city !== filter.city) return false;
      if (filter.type && pet.type !== filter.type) return false;
      if (filter.size && pet.size !== filter.size) return false;
      if (filter.energy && pet.energy !== filter.energy) return false;
      if (filter.age && pet.age !== filter.age) return false;

      return true;
    });
  }
}
