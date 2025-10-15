import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { config } from "dotenv";
import express, { type NextFunction, type Request, type Response } from "express";
import { shouldBeAdmin } from "./middleware/authMiddleware.js";
import userRouter from "./routes/user.route.js";
import { producer } from "./utils/kafka.js";

const app = express();
const port = process.env.PORT || 8003;

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

app.use('/users', shouldBeAdmin, userRouter);


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    return res.status(error.status || 500).json({ message: error.errors[0].message || "internal server error", status: error.status });
});

const start = async () => {
    try {
        await producer.connect();
        app.listen(port, () => {
            console.log("auth-service running on: http://localhost:8003");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();