import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository.ts";
import { CreateOrgUseCase } from "./create-org.ts";

describe(CreateOrgUseCase, () => {
    let orgsRepository: InMemoryOrgsRepository;
    let createOrgUseCase: CreateOrgUseCase;

    beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    createOrgUseCase = new CreateOrgUseCase(orgsRepository);
  });

    it("should be able to create a new org", async () => {

    const orgData = {
      name: "Happy Org",
      email: "happyorg@email.com",
      password_hash: "123456",
      whatsapp: "1199999999",
      address: "Happy Dog St.",
      number: "100",
      city: "Dog City",
      uf: "TC",
      latitude: -23.68698429708608,
      longitude: -46.70378601250786,
    };

    const org = await createOrgUseCase.execute(orgData);

    expect(org).toHaveProperty("id");
    expect(org.name).toBe(orgData.name);
    expect(org.email).toBe(orgData.email);
    expect(org.password_hash).not.toBe(orgData.password_hash);
  });

  it("should not be able to create an org with an existing email", async () => {

    const orgData = {
      name: "Happy Org",
      email: "happyorg@email.com",
      password_hash: "123456",
      whatsapp: "1199999999",
      address: "Happy Dog St.",
      number: "100",
      city: "Dog City",
      uf: "TC",
      latitude: -23.68698429708608,
      longitude: -46.70378601250786,
    };

    await createOrgUseCase.execute(orgData);

    const orgData2 = {
      name: "Happy Org 2",
      email: "happyorg@email.com",
      password_hash: "0123456",
      whatsapp: "1189999999",
      address: "Happy Dog 2 St.",
      number: "101",
      city: "Dog City 2",
      uf: "TC 2",
      latitude: -24.68698429708608,
      longitude: -47.70378601250786,
    };

    await expect(createOrgUseCase.execute(orgData2))
      .rejects.toThrow("Org with this email already exists.");
  });
});