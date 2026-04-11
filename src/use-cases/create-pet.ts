import type { CreatePetRequest, PetsRepository } from "../repositories/pets-repository.ts";
import type { OrgsRepository } from "../repositories/orgs-repository.ts";
import type { Pet } from "../../generated/prisma/browser.ts";
import { OrgNotFoundError } from "./errors/org-not-found-error.ts";

export class CreatePetUseCase {
  private petsRepository: PetsRepository;
  private orgsRepository: OrgsRepository;

  constructor(petsRepository: PetsRepository, orgsRepository: OrgsRepository) {
    this.petsRepository = petsRepository;
    this.orgsRepository = orgsRepository;
  }

  async execute(data: CreatePetRequest): Promise<Pet> {
    const org = await this.orgsRepository.findById(data.ongId);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const newPet = await this.petsRepository.create(data);

    return newPet;
  }
}
