import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Get Pet Details (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get pet details", async () => {
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

    await request(app.server).post("/pets").set("Authorization", `Bearer ${authenticate.body.token}`).send({
      name: "Rex",
      age: "2",
      description: "Cachorro brincalhão",
      type: "DOG",
      size: "MEDIUM",
      energy: "HIGH",
    });

    const petsList = await request(app.server).get("/pets").query({ city: "São Paulo" });

    const petId = petsList.body.pets[0].id;

    const response = await request(app.server).get(`/pets/${petId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.pet.id).toBe(petId);
    expect(response.body.pet.name).toBe("Rex");
  });
});
