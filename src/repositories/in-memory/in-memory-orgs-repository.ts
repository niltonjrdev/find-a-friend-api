import type { OrgsRepository } from '../orgs-repository.ts';
import type { Org } from '../../../generated/prisma/client.ts';
import type { CreateOrgRequest } from '../orgs-repository.ts';

export class InMemoryOrgsRepository implements OrgsRepository {
  private orgs: Org[] = [];

  async create(data: CreateOrgRequest): Promise<Org> {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      complement: data.complement ?? null,
      created_at: new Date(),
    };

    this.orgs.push(org);

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id);
    return org || null;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email);
    return org || null;
  }

  async findByWhatsapp(whatsapp: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.whatsapp === whatsapp);
    return org || null;
  }
}