"use client";

import { ShippingFormInputs } from '@repo/types';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';
import { ConfirmError } from '@stripe/stripe-js';
import React, { useState } from 'react'

export default function CheckoutForm({ shippingForm }: { shippingForm: ShippingFormInputs }) {

    const checkout = useCheckout();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ConfirmError | null>(null);


    if (checkout.type === 'loading') {
        return (
            <div>Loading...</div>
        );
    } else if (checkout.type === 'error') {
        return (
            <div>Error: {checkout.error.message}</div>
        );
    }
    const handleClick = async () => {
        setLoading(true);
        try {
            await checkout.checkout.updateEmail(shippingForm.email);
            await checkout.checkout.updateShippingAddress({
                name: "shipping_address",
                address: {
                    line1: shippingForm.address,
                    city: shippingForm.city,
                    country: "IN",
                },
            });
        } catch (error) {
            console.log(error);
        }

        const res = await checkout.checkout.confirm();
        if (res.type == "error") {
            console.log(res.error, "error while paying");
            setError(res.error);
        }
        console.log("web: checkout down and result is here", res);
        setLoading(false);
    };

    return (
        <form>
            <PaymentElement options={{ layout: "accordion" }} />
            <button disabled={loading} onClick={handleClick}>
                {loading ? "Loading..." : "Pay"}
            </button>
            {error && <div> {error.message}</div>}
        </form>
    )
}
