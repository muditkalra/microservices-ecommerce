import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express"


declare global {
    namespace Express {
        export interface Request {
            userId?: string;
        }
    }
}

export const shouldBeUser = (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req)
    const userId = auth.userId;

    // If user isn't authenticated, return a 401 error
    if (!userId) {
        return res.status(401).json({ message: 'You are not logged in' });
    }
    req.userId = userId;

    return next();
}