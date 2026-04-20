import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Profile (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get org profile", async () => {
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

    const response = await request(app.server).get("/me").set("Authorization", `Bearer ${authenticate.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.sub).toBeTruthy();
  });
});
