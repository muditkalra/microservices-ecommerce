import { StripeProductType } from "@repo/types";
import { consumer } from "./kafka"
import { createStripeProduct, deleteStripeProduct } from "./stripeProduct";

export const runkafkaSubscriptions = async () => {

    const createProductHandler = async (message: Record<"value", StripeProductType>) => {
        const product = message.value;
        console.log("received message:product:created", product);
        await createStripeProduct(product);
    };
    const deleteProductHandler = async (message: Record<"value", number>) => {
        const productId = message.value;
        console.log("received message:product:created", productId);
        await deleteStripeProduct(productId);
    }
    consumer.subscribe([{ "topicName": "product.created", handler: createProductHandler }, { "topicName": "product.deleted", handler: deleteProductHandler }]);
}