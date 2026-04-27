import type { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateUsersUseCase } from "../../../use-cases/factories/make-create-users.ts";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error.ts";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const createUserUseCase = makeCreateUsersUseCase();

  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    city: z.string(),
    uf: z.string().length(2),
    latitude: z.number(),
    longitude: z.number(),
  });

  const { name, email, password, whatsapp, city, uf, latitude, longitude } = createUserBodySchema.parse(request.body);

  try {
    await createUserUseCase.execute({
      name,
      email,
      password_hash: password,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
