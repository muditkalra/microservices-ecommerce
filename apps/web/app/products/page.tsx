import ProductList from '@/components/ProductList';
import React from 'react'

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category: string; sort: string; search: string }> }) {

    const category = (await searchParams).category;
    const search = (await searchParams).search;
    const sort = (await searchParams).sort;
    return (
        <div>
            <ProductList category={category} params='productpage' search={search} sort={sort} />
        </div>
    )
}
