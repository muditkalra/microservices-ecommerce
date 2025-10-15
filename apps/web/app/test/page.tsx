import { auth } from '@clerk/nextjs/server';
import React from 'react'

export default async function TestPage() {
    const { getToken } = await auth();
    const token = await getToken();
    // console.log(token);
    const res = await fetch("http://localhost:8000/test", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    // console.log(data);
    console.log("-----------------");
    const resOrd = await fetch("http://localhost:8001/orders", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const dataOrd = await resOrd.json();
    console.log(dataOrd);
    console.log("--------")
    const resPay = await fetch("http://localhost:8002/test", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const dataPay = await resPay.json();
    // console.log(dataPay);
    return (
        <div>page</div>
    )
}
