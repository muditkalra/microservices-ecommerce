"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema } from '@repo/types';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
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

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className='mb-4'>Add User</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form className='space-y-8'>
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