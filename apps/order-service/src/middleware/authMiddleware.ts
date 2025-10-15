import Clerk from "@clerk/fastify";
import { type CustomJwtSessionClaims } from "@repo/types";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
    interface FastifyRequest {
        userId?: string;
    }
}


export const shouldBeUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { userId } = Clerk.getAuth(req);

    // If user isn't authenticated, return a 401 error
    if (!userId) {
        return reply.status(401).send({ message: 'You are not logged in' });
    }
    req.userId = userId;
};

export const shouldBeAdmin = async (req: FastifyRequest, reply: FastifyReply) => {
    const { userId, sessionClaims } = Clerk.getAuth(req);

    // If user isn't authenticated, return a 401 error
    if (!userId) {
        return reply.status(401).send({ message: 'You are not logged in' });
    }

    const claims = sessionClaims as CustomJwtSessionClaims;

    if (claims.metadata?.role !== "admin") {
        return reply.status(403).send({ message: 'Unauthorized' });
    }

    req.userId = userId;
}