import type { FastifyRequest, FastifyReply } from "fastify";
import { makeCreatePetUseCase } from "../../use-cases/factories/make-create-pet.ts";
import { z } from "zod";
import { OrgNotFoundError } from "../../use-cases/errors/org-not-found-error.ts";

export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
  const createPetUseCase = makeCreatePetUseCase();

  const createPetBodySchema = z.object({
    name: z.string().optional(),
    age: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["DOG", "CAT"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
    energy: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  });

  const ongId = request.user.sub;

  const { name, age, description, type, size, energy } = createPetBodySchema.parse(request.body);

  try {
    await createPetUseCase.execute({
      name,
      age,
      description,
      type,
      size,
      energy,
      ongId,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      });
    }

    throw err;
  }
}
