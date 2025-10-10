import ProductList from '@/components/ProductList';
import React from 'react'

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category: string }> }) {

    const category = (await searchParams).category;
    return (
        <div>
            <ProductList category={category} params='productpage' />
        </div>
    )
}
