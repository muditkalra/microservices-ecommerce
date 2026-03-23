import ProductList from "@/components/ProductList";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: Promise<{ category: string }> }) {

	const category = (await searchParams).category;
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="">

				<div className="relative aspect-3/1 mb-8">
					<Image src="/featured.png" alt="Featured Product" fill />
				</div>
				<ProductList category={category} params="homepage" />
			</div>
		</Suspense>
	);
}
