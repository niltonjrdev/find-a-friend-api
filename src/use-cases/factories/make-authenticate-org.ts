import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository.ts";
import { AuthenticateOrgUseCase } from "../authenticate-orgs.ts";

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository);

  return authenticateOrgUseCase;
}
