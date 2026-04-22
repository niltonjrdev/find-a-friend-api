import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create Org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create an org", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Pet Happy",
      email: "pethappy@example.com",
      password: "123456",
      whatsapp: "11999999999",
      address: "Rua Teste",
      number: "123",
      city: "São Paulo",
      uf: "SP",
      latitude: -23.55052,
      longitude: -46.633308,
    });

    expect(response.statusCode).toBe(201);
  });
});
