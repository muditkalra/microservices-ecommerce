"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema } from '@repo/types';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';


export default function AddCategory() {

    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver: zodResolver(CategoryFormSchema)
    })

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className='mb-4'>Add Order</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form className='space-y-8'>
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