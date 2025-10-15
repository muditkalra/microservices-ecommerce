"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';


const formSchema = z.object({
    fullname: z.string().min(2, { error: "fullname must be at least 2 characters" }).max(50),
    email: z.email({ error: "Invalid email" }),
    phone: z.number().min(10, { error: "phone number must be at least 10 characters" }).max(10),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required")
})

export default function EditUser() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "John Doe",
            email: "john.doe@gmail.com",
            address: "123, Main st",
            phone: 9999990999,
            city: "Gurugram"
        }
    })

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className='mb-4'>Edit User</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form action="" className='space-y-8'>
                            <FormField control={form.control} name='fullname' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>FullName</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display full name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)}
                            />
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
                                </FormItem>)}
                            />
                            <FormField control={form.control} name='phone' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display phone number. (optional)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)}
                            />
                            <FormField control={form.control} name='address' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)}
                            />
                            <FormField control={form.control} name='city' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display city
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)}
                            />
                            <Button type='submit'>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    )
}