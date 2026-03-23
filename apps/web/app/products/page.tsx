import ProductList from '@/components/ProductList';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category: string; sort: string; search: string }> }) {

    const { category, sort, search } = await searchParams

    return (
        <div>
            <ProductList category={category} params='productpage' search={search} sort={sort} />
        </div>
    )
}
