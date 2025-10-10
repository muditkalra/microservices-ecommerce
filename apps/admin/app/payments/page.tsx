import React from 'react'
import { Payment, columns } from './columns';
import { DataTable } from './data-table';


const getData = async (): Promise<Payment[]> => {
    return [
        {
            id: "728ed521",
            amount: 134,
            status: "pending",
            fullName: "John Doe",
            userId: "1",
            email: "johndoe@gmail.com",
        },
        {
            id: "728ed522",
            amount: 124,
            status: "success",
            fullName: "Jane Doe",
            userId: "2",
            email: "janedoe@gmail.com",
        },
        {
            id: "728ed523",
            amount: 167,
            status: "success",
            fullName: "Mike Galloway",
            userId: "3",
            email: "mikegalloway@gmail.com",
        },
        {
            id: "728ed524",
            amount: 156,
            status: "failed",
            fullName: "Minerva Robinson",
            userId: "4",
            email: "minerbarobinson@gmail.com",
        },
        {
            id: "728ed525",
            amount: 145,
            status: "success",
            fullName: "Mable Clayton",
            userId: "5",
            email: "mableclayton@gmail.com",
        },
        {
            id: "728ed526",
            amount: 189,
            status: "pending",
            fullName: "Nathan McDaniel",
            userId: "6",
            email: "nathanmcdaniel@gmail.com",
        },
        {
            id: "728ed527",
            amount: 178,
            status: "success",
            fullName: "Myrtie Lamb",
            userId: "7",
            email: "myrtielamb@gmail.com",
        },
        {
            id: "728ed528",
            amount: 190,
            status: "success",
            fullName: "Leona Bryant",
            userId: "8",
            email: "leonabryant@gmail.com",
        },
    ];
};

export default async function PaymentsPage() {
    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 bg-secondary rounded-md">
                <h1 className='font-semibold'>All Payments</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
