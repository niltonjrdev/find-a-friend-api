import type { FastifyRequest, FastifyReply} from "fastify";
import { makeCreateOrgsUseCase } from "../../use-cases/factories/make-create-orgs.ts";
import {z} from "zod";

export async function createOrgController(request: FastifyRequest, reply: FastifyReply) {
  const createOrgUseCase = makeCreateOrgsUseCase();

  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    address: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    city: z.string(),
    uf: z.string().length(2),
    latitude: z.number(),
    longitude: z.number(),
  });

 const { 
    name, 
    email, 
    password, 
    whatsapp, 
    address, 
    number, 
    complement, 
    city, 
    uf, 
    latitude, 
    longitude } 
    = createOrgBodySchema.parse(request.body);

    try {
        await createOrgUseCase.execute({
        name,
        email,
        password_hash: password,
        whatsapp,
        address,
        number,
        complement,
        city,
        uf,
        latitude,
        longitude
        });

        return reply.status(201 ).send();

    } catch (err) {
        if (err instanceof Error) {
            return reply.status(400).send({
                message: err.message,
            });
        }

        throw err;

    }
}