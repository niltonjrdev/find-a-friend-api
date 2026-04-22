import type { OrgsRepository } from "../repositories/orgs-repository.ts";
import { compare } from "bcryptjs";
import type { Org } from "../../generated/prisma/browser.ts";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.ts";

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgUseCaseResponse {
  org: Org;
}

export class AuthenticateOrgUseCase {
  private orgsRepository: OrgsRepository;

  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute({email,password,}: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, org.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}