import { Hono } from "hono";
import Stripe from "stripe";
import { producer } from "../utils/kafka";
import { stripe } from "../utils/stripe";

const webhookRoute = new Hono();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

webhookRoute.post("/stripe", async (c) => {
    const body = await c.req.text();
    const sig = c.req.header("stripe-signature");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
    } catch (error) {
        console.log("webhook verification failed");
        return c.json({ error: "webhook verification failed" }, 400);
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            
            // will proceed to order creation using kafka;
            producer.send("payment.successful", {
                value: {
                    userId: session.client_reference_id,
                    email: session.customer_details?.email,
                    amount: Number(session.amount_total) / 100,
                    status: session.payment_status == "paid" ? "success" : "failed",
                    products: lineItems.data.map((item) => {
                        return {
                            name: item.description,
                            quantity: item.quantity,
                            price: (Number(item.price?.unit_amount) / 100),
                        }
                    })
                }
            })
            break;

        default:
            break;
    }
    return c.json({ received: true })
})

export default webhookRoute;