import type { PetsRepository } from "../repositories/pets-repository.ts";
import { PetNotFoundError } from "./errors/pet-not-found-error.ts";

interface GetPetDetailsUseCaseRequest {
  petId: string;
}

export class GetPetDetailsUseCase {
  private petsRepository: PetsRepository;

  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(request: GetPetDetailsUseCaseRequest) {
    const { petId } = request;

    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new PetNotFoundError();
    }

    return pet;
  }
}
