import type { FastifyRequest, FastifyReply } from "fastify";

export function verifyRole(role: string) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        if (request.user.role !== role) {
            return reply.status(403).send({ message: "Forbidden." });
        }
    };
}
