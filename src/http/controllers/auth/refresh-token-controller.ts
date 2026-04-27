import type { FastifyRequest, FastifyReply } from "fastify";

export async function refreshTokenController(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({ onlyCookie: true });

        const { roles } = request.user;

        const token = await reply.jwtSign({ roles }, { sign: { sub: request.user.sub } });

        const refreshToken = await reply.jwtSign(
            { roles }, 
            { sign: 
                { sub: request.user.sub, 
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
        return reply.status(401).send({ message: "Unauthorized." });
    }
}
