

import type { Org } from "../../generated/prisma/browser.ts";

export interface CreateOrgRequest {
  name: string;
  email: string;
  password_hash: string;
  whatsapp: string;
  address: string;
  number: string;
  complement?: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
}

export interface OrgsRepository {
  create(data: CreateOrgRequest): Promise<Org>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email:string): Promise<Org| null>;
  findByWhatsapp(whatsapp:string): Promise<Org | null>;  
}