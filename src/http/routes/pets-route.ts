import { createPetController } from "../controllers/create-pet-controller.ts";
import { fetchPetsByCityController } from "../controllers/fetch-pets-by-city-controller.ts";
import { getPetDetailsController } from "../controllers/get-pet-details-controller.ts";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middleware/verify-jwt.ts";

export async function petsRoute(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, createPetController);
  app.get("/pets", fetchPetsByCityController);
  app.get("/pets/:petId", getPetDetailsController);
}
