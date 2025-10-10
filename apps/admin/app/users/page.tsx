import React from 'react'
import { User, columns } from './columns';
import { DataTable } from './data-table';


const getData = async (): Promise<User[]> => {
    return [
        {
            id: "728ed521",
            avatar: "/users/1.png",
            status: "active",
            fullName: "John Doe",
            email: "johndoe@gmail.com",
        },
        {
            id: "728ed522",
            avatar: "/users/2.png",
            status: "active",
            fullName: "Jane Doe",
            email: "janedoe@gmail.com",
        },
        {
            id: "728ed523",
            avatar: "/users/3.png",
            status: "inactive",
            fullName: "Mike Galloway",
            email: "mikegalloway@gmail.com",
        },
        {
            id: "728ed524",
            avatar: "/users/4.png",
            status: "inactive",
            fullName: "Minerva Robinson",
            email: "minerbarobinson@gmail.com",
        },
        {
            id: "728ed525",
            avatar: "/users/5.png",
            status: "active",
            fullName: "Mable Clayton",
            email: "mableclayton@gmail.com",
        },
        {
            id: "728ed526",
            avatar: "/users/6.png",
            status: "active",
            fullName: "Nathan McDaniel",
            email: "nathanmcdaniel@gmail.com",
        },
        {
            id: "728ed527",
            avatar: "/users/7.png",
            status: "active",
            fullName: "Myrtie Lamb",
            email: "myrtielamb@gmail.com",
        },
        {
            id: "728ed528",
            avatar: "/users/8.png",
            status: "active",
            fullName: "Leona Bryant",
            email: "leonabryant@gmail.com",
        },
    ];
};

export default async function UsersPage() {
    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 bg-secondary rounded-md">
                <h1 className='font-semibold'>All Users</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
