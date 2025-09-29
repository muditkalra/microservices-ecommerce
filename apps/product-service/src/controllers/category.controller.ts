import { Prisma, prisma as prismaClient } from "@repo/product-db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
    const data: Prisma.CategoryCreateInput = req.body;
    const product = await prismaClient.category.create({ data });
    res.status(201).json(product);
}
export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: Prisma.CategoryUpdateInput = req.body;

    const updatedCategory = await prismaClient.category.update({
        where: {
            id: Number(id)
        },
        data
    });
    return res.status(200).json(updatedCategory);
}
export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCategory = await prismaClient.category.delete({
        where: {
            id: Number(id)
        }
    });
    return res.status(200).json(deletedCategory);
}
export const getCategories = async (req: Request, res: Response) => {
    const categories = await prismaClient.category.findMany();
    return res.status(200).json(categories);
}