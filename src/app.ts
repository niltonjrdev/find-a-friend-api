import fastify from "fastify";
import { fastifyCookie } from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { env } from "node:process";
import { orgsRoutes } from "./http/routes/orgs-route.ts";
import { authenticateRoute } from "./http/routes/authenticate-route.ts";

export const app = fastify();

app.register(fastifyCookie);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET ?? "default-secret", 
    cookie:{ cookieName: "refreshToken", 
        signed: false }, 
        sign: { expiresIn: "10m" }
});

app.register(orgsRoutes);
app.register(authenticateRoute);
