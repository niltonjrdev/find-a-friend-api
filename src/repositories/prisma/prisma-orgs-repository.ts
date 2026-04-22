import { prisma } from "../../lib/prisma.ts";
import type { OrgsRepository } from "../orgs-repository.ts";
import type { Org } from "../../../generated/prisma/client.ts";
import type { CreateOrgRequest } from "../orgs-repository.ts";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: CreateOrgRequest): Promise<Org> {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findByWhatsapp(whatsapp: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        whatsapp,
      },
    });

    return org;
  }
}
