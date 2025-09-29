import { Request, Response } from "express";
import { Prisma, prisma as prismaClient } from "@repo/product-db"

export const createProduct = async (req: Request, res: Response) => {
    const data: Prisma.ProductCreateInput = req.body;

    const { colors, images } = data;
    if (!colors || !Array.isArray(colors) || !colors.length) {
        return res.status(400).json({ message: "Colors array is required" });
    }

    if (!images || typeof images !== "object") {
        return res.status(400).json({ message: "Images Object is required" });
    }

    const missingColors = colors.filter((color) => !(color in images));
    if (missingColors.length) {
        return res.status(400).json({ message: "Missing Images for colors!", missingColors });
    }

    const product = await prismaClient.product.create({ data });
    res.status(201).json(product);
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const data: Prisma.ProductUpdateInput = req.body;
    const updatedProduct = await prismaClient.product.update({
        where: {
            id: Number(id)
        }, data
    });

    return res.status(200).json(updatedProduct);
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedProduct = await prismaClient.product.delete({
        where: {
            id: Number(id)
        }
    });

    return res.status(200).json(deletedProduct);
}

export const getProducts = async (req: Request, res: Response) => {
    const { sort, category, search, limit } = req.query;
    const orderBy = (() => {
        switch (sort) {
            case "asc":
                return { price: Prisma.SortOrder.asc };
            case "desc":
                return { price: Prisma.SortOrder.desc };
            case "oldest":
                return { createdAt: Prisma.SortOrder.asc };
            default:
                return { createdAt: Prisma.SortOrder.desc };
        }
    })();

    const products = await prismaClient.product.findMany({
        where: {
            category: {
                slug: category as string
            },
            name: {
                contains: search as string,
                mode: "insensitive"
            }
        },
        orderBy,
        take: limit ? Number(limit) : undefined
    });
    return res.status(200).json(products);
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await prismaClient.product.findUnique({
        where: {
            id: Number(id)
        }
    })
    return res.status(200).json(product);
}