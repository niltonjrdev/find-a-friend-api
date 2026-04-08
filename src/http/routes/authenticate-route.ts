import { authenticateOrgController } from "../controllers/authenticate-org-controller.ts";
import { refreshTokenController } from "../controllers/refresh-token-controller.ts";
import { profileController } from "../controllers/profile-controller.ts";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middleware/verify-jwt.ts";

export async function authenticateRoute(app: FastifyInstance) {
  app.post("/sessions", authenticateOrgController);
  app.patch("/token/refresh", refreshTokenController);
  app.get("/me", { onRequest: [verifyJwt] }, profileController);

}