import type { FastifyRequest, FastifyReply } from "fastify";
import { makeAuthenticateUserUseCase } from "../../../use-cases/factories/make-authenticate-user.ts";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error.ts";
import { z } from "zod";

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUserUseCase = makeAuthenticateUserUseCase();

  const authenticateUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateUserBodySchema.parse(request.body);

  try {
    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      { roles: "USER" },
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      { roles: "USER" },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

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
