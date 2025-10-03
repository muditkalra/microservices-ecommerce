import { Order, OrderSchemaType } from "@repo/order-db"
import { OrderType } from "@repo/types"

export const createOrder = async (order: OrderSchemaType) => {
    try {
        await Order.create(order);
    } catch (error) {
        console.log(error);
        throw error;
    }
}