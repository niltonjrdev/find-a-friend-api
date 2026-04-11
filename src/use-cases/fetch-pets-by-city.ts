import type { PetsRepository } from "../repositories/pets-repository.ts";
import type { PetEnergy, PetSize, PetType } from "../../generated/prisma/browser.ts";

interface FetchPetsByCityUseCaseRequest {
  city: string;
  type?: PetType;
  size?: PetSize;
  energy?: PetEnergy;
  age?: string;
}

export class FetchPetsByCityUseCase {
  private petsRepository: PetsRepository;

  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(request: FetchPetsByCityUseCaseRequest) {
    const pets = await this.petsRepository.findManyByOngCity(request);

    return pets;
  }
}
