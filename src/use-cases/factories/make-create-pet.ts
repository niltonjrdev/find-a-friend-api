import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository.ts";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository.ts";
import { CreatePetUseCase } from "../create-pet.ts";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository);

  return createPetUseCase;
}
