import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository.ts';
import { CreateOrgUseCase } from '../create-org.ts';

export function makeCreateOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

  return createOrgUseCase;
}