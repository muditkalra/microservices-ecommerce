"use client";
import React from 'react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';



const formSchema = z.object({
    username: z.string().min(4, { error: "username must be at least 4 characters" }).max(50),
    email: z.email({ error: "Invalid email" }),
    phone: z.number().min(10, { error: "phone number must be at least 10 characters" }).max(10),
    location: z.string().min(2),
    roles: z.enum(["admin", "user"])
})

export default function EditUser() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "Donald Trump",
            email: "donaldtrump@presidentofusa.com",
            location: "White House",
            phone: 9999990999,
            roles: "admin"
        }
    })

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className='mb-4'>Edit User</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form action="" className='space-y-8'>
                            <FormField control={form.control} name='username' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display username.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)} />
                            <FormField control={form.control} name='email' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display email
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)} />
                            <FormField control={form.control} name='phone' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display phone number.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)} />
                            <FormField control={form.control} name='location' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display location.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)} />
                            <FormField control={form.control} name='roles' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className='w-[150px]'>
                                                <SelectValue placeholder="Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="user">User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Only Verified user can be admin
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)} />
                            <Button>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    )
}