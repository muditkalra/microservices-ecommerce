import Clerk from "@clerk/fastify";
import fastify from "fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order.js";

const app = fastify();

app.get('/health', (req, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})

app.register(Clerk.clerkPlugin);

app.get('/test', { preHandler: shouldBeUser }, (req, reply) => {
    return reply.status(200).send({ "message": "order service authenticated", userId: req.userId });
})


app.register(orderRoute);

const start = async () => {
    try {
        await connectOrderDB();
        await app.listen({ port: 8001 });
        console.log("order-service running on: http://localhost:8001");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();