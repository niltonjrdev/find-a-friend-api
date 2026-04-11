import { prisma } from "../../lib/prisma.ts";
import type { PetsRepository, CreatePetRequest, FetchPetsByCityRequest } from "../pets-repository.ts";
import type { Pet } from "../../../generated/prisma/client.ts";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatePetRequest): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async findManyByOngCity(filter: FetchPetsByCityRequest): Promise<Pet[]> {
    return prisma.pet.findMany({
      where: {
        ong: { city: filter.city },
        ...(filter.type && { type: filter.type }),
        ...(filter.size && { size: filter.size }),
        ...(filter.energy && { energy: filter.energy }),
        ...(filter.age && { age: filter.age }),
      },
    });
  }
}
