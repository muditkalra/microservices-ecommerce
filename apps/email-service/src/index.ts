import { createConsumer, createKafkaClient } from "@repo/kafka";
import sendMail from "./utils/mailer.js";


const kafkaClient = createKafkaClient("email-service");
const consumer = createConsumer(kafkaClient, "email-group");

const start = async () => {
    try {
        const userCreatedHandler = async (message: any) => {
            const { email, username } = message.value;
            await sendMail({ email, text: `Welcome ${username}. Your account has been created`, subject: "Welcome to Ecommerce App" });
        }

        const orderCreatedHandler = async (message: any) => {
            const { email, amount, status } = message.value;
            console.log("sending email to user:", email);
            await sendMail({ email, text: `Hello! Your order: Amount: ${amount}, Status:${status}`, subject: "Order has been created" });
        }
        consumer.connect();
        consumer.subscribe([{ topicName: "user.created", handler: userCreatedHandler }, { topicName: "order.created", handler: orderCreatedHandler }]);
    } catch (error) {
        console.log(error);
    }
}

start();