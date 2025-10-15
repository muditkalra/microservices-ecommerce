"use client";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema } from '@repo/types';
import { useMutation } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { z } from "zod";
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';


export default function AddCategory() {
    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: {
            name: "",
            slug: ""
        }
    })

    const { getToken } = useAuth() // because it is a client comp, in server auth is used;

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof CategoryFormSchema>) => {
            const token = await getToken();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/category`,
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
                throw new Error("Failed to create category!");
            }
        },
        onSuccess: () => {
            toast.success("Category created successfully");
            form.reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className='mb-4'>Add Order</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form className='space-y-8' onSubmit={form.handleSubmit(data => mutation.mutate(data))}>
                            <FormField control={form.control} name='name' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter category name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)}
                            />
                            <FormField control={form.control} name='slug' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter Category slug
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)}
                            />
                            <Button type='submit' disabled={mutation.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed">
                                {mutation.isPending ? "Submitting..." : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    )
}