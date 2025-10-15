import { auth } from '@clerk/nextjs/server';
import { OrderType, ProductType } from '@repo/types';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';


// const products = [
//     {
//         id: 1,
//         name: "Adidas CoreFit T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 39.9,
//         sizes: ["s", "m", "l", "xl", "xxl"],
//         colors: ["gray", "purple", "green"],
//         images: {
//             gray: "/products/1g.png",
//             purple: "/products/1p.png",
//             green: "/products/1gr.png",
//         },
//     },
//     {
//         id: 2,
//         name: "Puma Ultra Warm Zip",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["s", "m", "l", "xl"],
//         colors: ["gray", "green"],
//         images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     },
//     {
//         id: 3,
//         name: "Nike Air Essentials Pullover",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 69.9,
//         sizes: ["s", "m", "l"],
//         colors: ["green", "blue", "black"],
//         images: {
//             green: "/products/3gr.png",
//             blue: "/products/3b.png",
//             black: "/products/3bl.png",
//         },
//     },
//     {
//         id: 4,
//         name: "Nike Dri Flex T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 29.9,
//         sizes: ["s", "m", "l"],
//         colors: ["pink", "white"],
//         images: { white: "/products/4w.png", pink: "/products/4p.png" },
//     },
//     {
//         id: 5,
//         name: "Under Armour StormFleece",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 49.9,
//         sizes: ["s", "m", "l"],
//         colors: ["orange", "red", "black"],
//         images: {
//             red: "/products/5r.png",
//             orange: "/products/5o.png",
//             black: "/products/5bl.png",
//         },
//     },
// ];

const latestTransactions = [
    {
        id: 1,
        title: "Order Payment",
        badge: "John Doe",
        image:
            "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
        count: 1400,
    },
    {
        id: 2,
        title: "Order Payment",
        badge: "Jane Smith",
        image:
            "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
        count: 2100,
    },
    {
        id: 3,
        title: "Order Payment",
        badge: "Michael Johnson",
        image:
            "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
        count: 1300,
    },
    {
        id: 4,
        title: "Order Payment",
        badge: "Lily Adams",
        image:
            "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
        count: 2500,
    },
    {
        id: 5,
        title: "Order Payment",
        badge: "Sam Brown",
        image:
            "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
        count: 1400,
    },
];

export default async function CardList({ title }: { title: "Popular Products" | "latest Transactions" }) {

    const { getToken } = await auth()
    const token = await getToken();
    let products: ProductType[] = [];
    let orders: OrderType[] = [];
    
    if (title == "Popular Products") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?limit=5&popular=true`);
        products = await res.json();
    } else {
        orders = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders?limit=5`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.json());
    }

    return (
        <div>
            <h1 className='text-lg font-medium mb-6'>
                {title}
            </h1>
            <div className="flex flex-col gap-2">
                {title === "Popular Products" ? products.map((item, index) => (
                    <Card key={index} className='flex flex-row items-center justify-between gap-4 p-4'>
                        <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                            <Image src={Object.values(item.images as Record<string, string>)[0] || ""} alt={item.name} fill className='object-cover' />
                        </div>
                        <CardContent className='p-0 flex-1'>
                            <CardTitle className='text-sm font-medium'>
                                {item.name}
                            </CardTitle>
                        </CardContent>
                        <CardFooter>
                            Rs. {item.price}
                        </CardFooter>
                    </Card>
                )) : orders.map((item) => (
                    <Card key={item._id} className='flex flex-row items-center justify-between gap-4 p-4'>
                        
                        <CardContent className='p-0 flex-1'>
                            <CardTitle className='text-sm font-medium'>
                                {item.email}
                            </CardTitle>
                        </CardContent>
                        <Badge variant={"secondary"}> {item.status}</Badge>
                        <CardFooter>
                            Rs. {item.amount}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
