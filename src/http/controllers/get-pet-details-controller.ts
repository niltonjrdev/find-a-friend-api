import type { FastifyRequest, FastifyReply } from "fastify";
import { makeGetPetDetailsUseCase } from "../../use-cases/factories/make-get-pet-details.ts";
import { z } from "zod";
import { PetNotFoundError } from "../../use-cases/errors/pet-not-found-error.ts";

export async function getPetDetailsController(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsUseCase = makeGetPetDetailsUseCase();

  const paramsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = paramsSchema.parse(request.params);

  try {
    const pet = await getPetDetailsUseCase.execute({
      petId,
    });

    return reply.status(200).send(pet);
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      });
    }

    throw err;
  }
}
