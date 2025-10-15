import { ProductsType } from '@repo/types';
import { columns } from './columns';
import { DataTable } from './data-table';


const getData = async (): Promise<ProductsType> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return []
    }
};

export default async function ProductsPage() {
    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 bg-secondary rounded-md">
                <h1 className='font-semibold'>All Products</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
