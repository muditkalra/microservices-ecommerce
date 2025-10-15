import { OrderSchemaType } from "@repo/order-db";
import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscriptions = () => {

    const createOrderHandler = async (message: Record<"value", OrderSchemaType>) => {
        const order = message.value;
        console.log("received message:payment:successful", order);
        await createOrder(order);
    };

    consumer.subscribe([{ topicName: "payment.successful", handler: createOrderHandler }]);
}