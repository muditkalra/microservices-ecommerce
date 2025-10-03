import { Order } from "@repo/order-db";
import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware";

export const orderRoute = async (fastify: FastifyInstance) => {
    fastify.get("/user-orders", { preHandler: shouldBeUser }, async (req, reply) => {
        const order = await Order.find({ userId: req.userId });
        return reply.send(order);
    });

    fastify.get("/orders", { preHandler: shouldBeAdmin }, async (req, reply) => {
        const order = await Order.find();
        return reply.send(order);
    })
}