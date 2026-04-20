import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Refresh Token (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh token", async () => {
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

    const cookies = authenticate.get("Set-Cookie");
    expect(cookies).toBeDefined();

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies as string[]);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
  });
});
