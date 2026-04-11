import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository.ts";
import { GetPetDetailsUseCase } from "../get-pet-details.ts";

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetDetailsUseCase;
}
