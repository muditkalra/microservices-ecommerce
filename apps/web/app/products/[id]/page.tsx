import { Suspense } from "react";
import SingleProductPage from "./SingleProductPage";


export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <Suspense fallback={<div> Loading..</div>}>
            <SingleProductPage id={id} />
        </Suspense>
    )

}
