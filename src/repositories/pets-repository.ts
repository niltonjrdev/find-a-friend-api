import type { Pet, PetEnergy, PetSize, PetType } from "../../generated/prisma/browser.ts";

export interface CreatePetRequest {
  name?: string;
  age?: string;
  description?: string;
  type?: PetType;
  size?: PetSize;
  energy?: PetEnergy;
  ongId: string;
}

export interface FetchPetsByCityRequest {
  city: string;
  type?: PetType;
  size?: PetSize;
  energy?: PetEnergy;
  age?: string;
}

export interface PetsRepository {
  create(data: CreatePetRequest): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyByOngCity(filter: FetchPetsByCityRequest): Promise<Pet[]>;
}
