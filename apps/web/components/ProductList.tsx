import { ProductType } from "@repo/types";
import Categories from './Categories';
import ProductCard from './ProductCard';
import Link from "next/link";
import Filter from "./Filter";

const fetchData = async ({ category, sort, search, params }: { category?: string; sort?: string; search?: string; params: "homepage" | "productpage" }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`)

    const data: ProductType[] = await res.json();
    return data
}

export default async function ProductList({ category, sort, search, params }: { category: string, sort?: string; search?: string; params: "homepage" | "productpage" }) {

    const products = await fetchData({ category, sort, search, params });
    console.log(products);

    return (
        <div className='w-full'>
            <Categories />
            {params === "productpage" && <Filter />}
            <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Link href={category ? `/products/?category=${category}` : '/products'}
                className="flex justify-end mt-4 underline text-sm text-gray-500"
            >
                View all Product
            </Link>
        </div>
    )
}
