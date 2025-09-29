import { Prisma, prisma as prismaClient } from "@repo/product-db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
    const data: Prisma.CategoryCreateInput = req.body;
    const product = await prismaClient.category.create({ data });
    res.status(201).json(product);
}
export const updateCategory = (req: Request, res: Response) => { }
export const deleteCategory = (req: Request, res: Response) => { }
export const getCategories = (req: Request, res: Response) => { }
export const getCategory = (req: Request, res: Response) => { }