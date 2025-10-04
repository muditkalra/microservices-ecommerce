import { getAuth } from "@clerk/express";
import type { CustomJwtSessionClaims } from "@repo/types";
import { NextFunction, Request, Response } from "express";

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

    if (!userId) {
        return res.status(401).json({ message: 'You are not logged in' });
    }
    req.userId = userId;

    return next();
};

export const shouldBeAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { userId, sessionClaims } = getAuth(req)

    if (!userId) {
        return res.status(401).json({ message: 'You are not logged in' });
    }

    const claims = sessionClaims.metadata as CustomJwtSessionClaims

    if (claims.metadata?.role !== "admin") {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = userId;

    return next();
}