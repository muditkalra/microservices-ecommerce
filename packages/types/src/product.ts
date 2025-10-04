import type { Product, Category } from "@repo/product-db"
import z from "zod";

export type ProductType = Product;
export type CategoryType = Category;

export type StripeProductType = {
    id: string;
    name: string;
    price: number;
}

export const CategoryFormSchema = z.object({
    name: z.string().min(1, { error: "Name is required" }),
    slug: z.string().min(1, { error: "slug is required" })
});

export const colors = [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
    "black",
    "white",
] as const;

export const sizes = [
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
] as const;


export const ProductFormSchema = z.object({
    name: z.string({ error: "Product name is required" }).min(2, { error: "Product name must be at least 2 characters" }),
    shortDescription: z.string({ error: "short description is required" }).min(2, { error: "short description is required" }).max(60),
    description: z.string({ error: "Description is required" }).min(10, { error: "description must be at least 10 characters" }).max(100),
    price: z.number({ error: "Price is required" }).min(1, { error: "Price Can't be below 1" }),
    categorySlug: z.string({ error: "Category is required" }).min(1, { error: "Cagtegory is required" }),
    sizes: z.array(z.enum(sizes)).min(1, { error: "at least 1 size is required" }),
    colors: z.array(z.enum(colors)).min(1, { error: "at least one color is required" }),
    images: z.record(z.string(), z.string(), { error: "Image for each color is required" })
}).refine((data) => {
    const missingImages = data.colors.filter((color) => !data.images?.[color]);
    return missingImages.length === 0
}, {
    error: "Images is required for each selected color!",
    path: ["images"]
})