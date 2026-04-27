import { createOrgController } from "../controllers/orgs/create-org-controller.ts";
import type { FastifyInstance } from "fastify";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
}
