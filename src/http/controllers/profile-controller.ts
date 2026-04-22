import type { FastifyRequest, FastifyReply } from "fastify";

export async function profileController(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send({ sub: request.user.sub });

}
