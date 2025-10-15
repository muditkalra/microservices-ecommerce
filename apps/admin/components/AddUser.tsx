"use client";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema } from '@repo/types';
import { useMutation } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { z } from "zod";
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from "./ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';


export default function AddUser() {

    const form = useForm<z.infer<typeof UserFormSchema>>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: [],
            username: "",
            password: "",
        },
    })

    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
            const token = await getToken();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) {
                throw new Error("Failed to create user!");
            }
        },
        onSuccess: () => {
            toast.success("User created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <SheetContent>
            <ScrollArea className="h-screen">
                <SheetHeader>
                    <SheetTitle className='mb-4'>Add User</SheetTitle>
                    <SheetDescription asChild>
                        <Form {...form}>
                            <form className='space-y-8' onSubmit={form.handleSubmit(data => mutation.mutate(data))}>
                                <FormField control={form.control} name='firstName' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your First Name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='lastName' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your Last Name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='username' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>UserName</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your Last Name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='emailAddress' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Addresses</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="email1@gmail.com, email2@gmail.com"
                                                onChange={(e) => {
                                                    const emails = e.target.value
                                                        .split(",")
                                                        .map((email) => email.trim())
                                                        .filter((email) => email);
                                                    field.onChange(emails);
                                                }} />
                                        </FormControl>
                                        <FormDescription>
                                            Only admin can see you email
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" />
                                            </FormControl>
                                            <FormDescription>Enter user password.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' disabled={mutation.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed">
                                    {mutation.isPending ? "Submitting..." : "Submit"}
                                </Button>
                            </form>
                        </Form>
                    </SheetDescription>
                </SheetHeader>
            </ScrollArea>
        </SheetContent>
    )
}