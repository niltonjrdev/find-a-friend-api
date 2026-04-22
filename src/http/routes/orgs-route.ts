import { createOrgController } from '../controllers/create-org-controller.ts';
import type { FastifyInstance } from 'fastify';

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController);
}

