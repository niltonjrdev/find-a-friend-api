import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create User (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Abby Boom",
      email: "abbyboom@example.com",
      password: "123456",
      whatsapp: "11987561234",
      city: "Sidney",
      uf: "TC",
      latitude: -23.68,
      longitude: -46.7,
    });

    expect(response.statusCode).toBe(201);
  });
});
