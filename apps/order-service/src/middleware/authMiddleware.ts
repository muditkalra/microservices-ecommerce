import Clerk from "@clerk/fastify";
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
}