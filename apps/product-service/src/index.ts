import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv"
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
config();


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
    return;
})

app.use(clerkMiddleware());

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

// server running
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("product-service running on: http://localhost:8000");
})