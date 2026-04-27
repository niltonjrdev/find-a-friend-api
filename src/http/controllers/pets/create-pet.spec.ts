import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    await request(app.server).post("/orgs").send({
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

    const authenticate = await request(app.server).post("/sessions").send({
      email: "pethappy@example.com",
      password: "123456",
    });

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authenticate.body.token}`)
      .send({
        name: "Rex",
        age: "2",
        description: "Cachorro brincalhão",
        type: "DOG",
        size: "MEDIUM",
        energy: "HIGH",
      });

    expect(response.statusCode).toBe(201);
  });

  it("should not be able to create a pet as a user", async () => {
    await request(app.server).post("/users").send({
      name: "Abby Boom",
      email: "abbyboom@example.com",
      password: "123456",
      whatsapp: "11987561234",
      city: "Sidney",
      uf: "TC",
      latitude: -23.68,
      longitude: -46.7,
    });

    const authenticate = await request(app.server).post("/sessions/user").send({
      email: "abbyboom@example.com",
      password: "123456",
    });

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authenticate.body.token}`)
      .send({
        name: "Rex",
        age: "2",
        description: "Cachorro brincalhão",
        type: "DOG",
        size: "MEDIUM",
        energy: "HIGH",
      });

    expect(response.statusCode).toBe(403);
  });
});
