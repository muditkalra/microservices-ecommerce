import { Product } from "@repo/product-db";
import { z } from "zod"
import { ProductType } from "./product";

// export type CartItemType = Product & {
//     quantity: number,
//     selectedSize: string,
//     selectedColor: string
// }; // original;


export type CartItemType = Omit<Product, "categorySlug" | "createdAt" | "updatedAt"> & {
    quantity: number,
    selectedSize: string,
    selectedColor: string
};

export type CartItemsType = CartItemType[]; //original


export const shippingFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email({ error: "Should be a valid email address" }),
    phone: z.string().min(10, "should be a valid 10 digit number").regex(/^\d+$/, "Phone numer must contain only number!"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required")
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
    cardHolder: z.string().min(1, "Card holder is required!"),
    cardNumber: z
        .string()
        .min(16, "Minimum 16 digits required")
        .max(16, "Should be a valid card number"),
    expirationDate: z
        .string()
        .regex(
            /^(0[1-9]|1[0-2])\/\d{2}$/,
            "Expiration date must be in MM/YY format!"
        ),
    cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;


export type CartStoreStateType = {
    cart: CartItemsType,
    hasHyderated: boolean
}

export type CartStoreActionsType = {
    addToCart: (product: CartItemType) => void;
    removeFromCart: (product: CartItemType) => void;
    clearCart: () => void
}