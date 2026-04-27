import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Authenticate User (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a user", async () => {
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

    expect(authenticate.statusCode).toBe(200);
    expect(authenticate.body.token).toBeTruthy();
  });
});
