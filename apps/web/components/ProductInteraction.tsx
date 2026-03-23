"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@repo/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductInteraction({ product, selectedSize, selectedColor }: { product: ProductType; selectedSize: string; selectedColor: string }) {

    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();
    const [quantity, setQuantity] = useState<number>(1);

    const { addToCart } = useCartStore()

    const handleTypeChange = (type: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(type, value);
        router.push(`${path}?${params.toString()}`, { scroll: false });
    }


    const handleQuantityChange = (type: "incr" | "decr") => {
        if (type == "incr") setQuantity(prev => prev + 1);
        if (type == "decr") setQuantity(prev => prev - 1 > 0 ? prev - 1 : 1);
    }

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity,
            selectedColor,
            selectedSize
        });
        toast.success("Product added to Cart");
    }

    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* size */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500">
                    Sizes
                </span>
                <div className="flex items-center gap-2">
                    {product.sizes.map((size:string) => (
                        <div className={`cursor-pointer border-1 p-[2px] ${selectedSize == size ? "border-gray-600" : "border-gray-300"}`} onClick={() => handleTypeChange("size", size)} key={size}>
                            <div className={`w-6 h-6  text-center flex items-center justify-center ${selectedSize == size ? "text-white bg-black" : "text-black bg-white"} `} >{size.toUpperCase()}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* colors */}

            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500">
                    colors
                </span>
                <div className="flex items-center gap-2">
                    {product.colors.map((color:string) => (
                        <div className={`cursor-pointer border-1 p-[2px] ${selectedColor == color ? "border-gray-300" : "border-white"}`} onClick={() => handleTypeChange("color", color)} key={color}>
                            <div key={color} style={{ backgroundColor: color }} className="w-6 h-6" />
                        </div>
                    ))}
                </div>
            </div>
            {/* quantity */}

            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500">
                    Quantity
                </span>
                <div className="flex items-center gap-2">
                    <button className="cursor-pointer border-1 border-gray-300 p-1" onClick={() => handleQuantityChange("decr")}>
                        <Minus className="w-4 h-4" />
                    </button>
                    <span>{quantity}</span>
                    <button className="cursor-pointer border-1 border-gray-300 p-1" onClick={() => handleQuantityChange("incr")}>
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* buttons */}

            <button onClick={handleAddToCart} className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium ">
                <Plus className="w-4 h-4 " />
                Add to Cart
            </button>
            <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium cursor-pointer">
                <ShoppingCart className="w-4 h-4" />
                Buy this Item
            </button>
        </div >
    )
}

