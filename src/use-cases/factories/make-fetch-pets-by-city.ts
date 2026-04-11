import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository.ts";
import { FetchPetsByCityUseCase } from "../fetch-pets-by-city.ts";

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository);

  return fetchPetsByCityUseCase;
}
