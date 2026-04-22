
import type { CreateOrgRequest, OrgsRepository } from "../repositories/orgs-repository.ts";
import type { Org } from "../../generated/prisma/browser.ts";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error.ts";

export class CreateOrgUseCase {
  private orgsRepository: OrgsRepository;

  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute(data: CreateOrgRequest): Promise<Org> {
  const org = await this.orgsRepository.findByEmail(data.email);
  

    if (org) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(data.password_hash, 6);

    const newOrg = await this.orgsRepository.create({ ...data, password_hash: passwordHash });
    
    return newOrg;
    
  }
}