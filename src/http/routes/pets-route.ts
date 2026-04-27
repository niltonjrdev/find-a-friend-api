import { createPetController } from "../controllers/pets/create-pet-controller.ts";
import { fetchPetsByCityController } from "../controllers/pets/fetch-pets-by-city-controller.ts";
import { getPetDetailsController } from "../controllers/pets/get-pet-details-controller.ts";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middleware/verify-jwt.ts";
import { verifyRole } from "../middleware/verify-role.ts";

export async function petsRoute(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt, verifyRole("ORG")] }, createPetController);
  app.get("/pets", fetchPetsByCityController);
  app.get("/pets/:petId", getPetDetailsController);
}
