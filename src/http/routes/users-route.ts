import { createUserController } from "../controllers/users/create-user-controller.ts";
import type { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", createUserController);
}
