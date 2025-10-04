import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import { consumer, producer } from "./utils/kafka.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
config();
app.use(clerkMiddleware());


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
    return;
})


app.get('/test', shouldBeUser, (req, res) => {
    res.json({ "message": "product service authenticated", userId: req.userId });
    return;
})

app.use('/products', productRouter);
app.use('/category', categoryRouter);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message || "internal server error" });
})


const start = async () => {
    try {
        Promise.all([await producer.connect(), await consumer.connect()]);
        app.listen(port, () => {
            console.log("product-service running on: http://localhost:8000");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();