import fastify from "fastify";
import { orgsRoutes } from "./http/routes/orgs-route.ts";

export const app = fastify();

app.register(orgsRoutes);    

