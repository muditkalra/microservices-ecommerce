"use client";

import useCartStore from '@/stores/cartStore';
import { useAuth } from '@clerk/nextjs';
import { CartItemsType, ShippingFormInputs } from '@repo/types';
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
    return fetch(
        `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
        {
            method: "POST",
            body: JSON.stringify({
                cart,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((response) => response.json())
        .then((json) => json.checkoutSessionClientSecret).catch((error) => console.log(error));
};

export default function StripePaymentForm({ shippingForm }: { shippingForm: ShippingFormInputs }) {

    const { cart } = useCartStore();

    const [token, setToken] = useState<string | null>(null);
    const { getToken } = useAuth();

    useEffect(() => {
        getToken().then((token) => setToken(token));
    }, []);

    if (!token) {
        return <div className="">Loading...</div>;
    }

    return (
        <CheckoutProvider
            stripe={stripe}
            options={{ clientSecret: fetchClientSecret(cart, token) }}
        >
            <CheckoutForm shippingForm={shippingForm} />
        </CheckoutProvider>
    )
}
