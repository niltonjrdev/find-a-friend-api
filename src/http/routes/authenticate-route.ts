import { authenticateOrgController } from "../controllers/orgs/authenticate-org-controller.ts";
import { authenticateUserController } from "../controllers/users/authenticate-user-controller.ts";
import { refreshTokenController } from "../controllers/auth/refresh-token-controller.ts";
import { profileController } from "../controllers/auth/profile-controller.ts";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middleware/verify-jwt.ts";

export async function authenticateRoute(app: FastifyInstance) {
  app.post("/sessions", authenticateOrgController);
  app.post("/sessions/user", authenticateUserController);
  app.patch("/token/refresh", refreshTokenController);
  app.get("/me", { onRequest: [verifyJwt] }, profileController);
}
