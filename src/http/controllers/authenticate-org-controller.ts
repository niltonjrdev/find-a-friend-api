import type { FastifyRequest, FastifyReply} from "fastify";
import { makeAuthenticateOrgUseCase } from "../../use-cases/factories/make-authenticate-org.ts";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error.ts";
import {z} from "zod";

export async function authenticateOrgController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateOrgUseCase = makeAuthenticateOrgUseCase();

     const authenticateOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

    const { email, password } = authenticateOrgBodySchema.parse(request.body);

    try {
        const { org } = await authenticateOrgUseCase.execute({
            email,
            password,
        });

        const token = await reply.jwtSign(
            { roles: "ORG",},
            { sign: { sub: org.id }
        });

        const refreshToken = await reply.jwtSign(
            { roles: "ORG",},
            { sign: { sub: org.id, 
                expiresIn: "7d" }
            });

        reply.setCookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: true,
            path: "/",
        });

        return reply.status(200).send({ token });

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({
                message: err.message,
            });
        }

        throw err;
    }
}