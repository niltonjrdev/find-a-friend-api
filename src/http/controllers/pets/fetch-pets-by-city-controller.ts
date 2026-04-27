import type { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchPetsByCityUseCase } from "../../../use-cases/factories/make-fetch-pets-by-city.ts";
import { z } from "zod";

export async function fetchPetsByCityController(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase();

  const queryParamsSchema = z.object({
    city: z.string(),
    type: z.enum(["DOG", "CAT"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
    energy: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    age: z.string().optional(),
  });

  const { city, type, size, energy, age } = queryParamsSchema.parse(request.query);

  const pets = await fetchPetsByCityUseCase.execute({
    city,
    type,
    size,
    energy,
    age,
  });

  return reply.status(200).send({ pets });
}
