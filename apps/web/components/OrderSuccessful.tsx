"use client";
import { useEffect, useState } from 'react';
import useCartStore from '@/stores/cartStore';
import Link from 'next/link';
import { Button } from './ui/button';

export default function OrderSuccessful({ data }: { data: { status: string; paymentStatus: string } }) {
    const clearCart = useCartStore((state) => state.clearCart);
    const hasHydrated = useCartStore((state) => state.hasHyderated);
    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        // Only clear cart once, after hydration, and if payment was successful
        if (data.paymentStatus === "paid" && hasHydrated && !cleared) {
            clearCart();
            setCleared(true);
        }
    }, [data.paymentStatus, hasHydrated, cleared, clearCart]);

    return (
        <div className="flex flex-col items-center justify-center h-[200px]">
            <h1>Payment {data.status}</h1>
            <p>Payment status: {data.paymentStatus}</p>
            <Link href="/orders" className='mt-2'>
                <Button variant={"link"} className='cursor-pointer'>
                    See your orders
                </Button>
            </Link>
        </div>
    );
}