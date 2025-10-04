import { Order, OrderSchemaType } from "@repo/order-db"
import { OrderType } from "@repo/types"
import { producer } from "./kafka";

export const createOrder = async (order: OrderSchemaType) => {
    try {
        const newOrder = await Order.create(order);
        producer.send("order.created", {
            value: {
                email: newOrder.email,
                amount: newOrder.amount,
                status: newOrder.status
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}