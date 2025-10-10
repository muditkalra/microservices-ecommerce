"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors, ProductFormSchema, sizes, UserFormSchema } from '@repo/types';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";


// temporary category
const categories = [
    "T-shirts",
    "Shoes",
    "Accessories",
    "Bags",
    "Dresses",
    "Jackets",
    "Gloves",
] as const;

export default function AddProduct() {

    const form = useForm<z.infer<typeof ProductFormSchema>>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: "",
            shortDescription: "",
            description: "",
            price: 0,
            categorySlug: "",
            sizes: [],
            colors: [],
            images: {},
        },
    })

    return (
        <SheetContent>
            <ScrollArea className="h-screen">

                <SheetHeader>
                    <SheetTitle className='mb-4'>Add Product</SheetTitle>
                    <SheetDescription asChild>
                        <Form {...form}>
                            <form className='space-y-8'>
                                <FormField control={form.control} name='name' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the name of product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='shortDescription' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the short description of product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='description' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the description of product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='price' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the price of product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='categorySlug' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Enter the category of product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='sizes' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sizes</FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-3">
                                                {sizes.map((size) => (
                                                    <div className="flex items-center gap-2" key={size}>
                                                        <Checkbox id="size" checked={field.value?.includes(size)} onCheckedChange={(checked) => {
                                                            const currentValues = field.value || [];
                                                            if (checked) {
                                                                field.onChange([...currentValues, size]);
                                                            } else {
                                                                field.onChange(() => currentValues.filter((s) => s !== size))
                                                            }
                                                        }} />
                                                        <label htmlFor="sizes" className="text-sm"> {size}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Enter the available sizes for the product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                                <FormField control={form.control} name='colors' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Colors</FormLabel>
                                        <FormControl>
                                            <div className="space-y-6">

                                                <div className="grid grid-cols-3">
                                                    {colors.map((color) => (
                                                        <div className="flex items-center gap-2" key={color}>
                                                            <Checkbox id="size" checked={field.value?.includes(color)} onCheckedChange={(checked) => {
                                                                const currentValues = field.value || [];
                                                                if (checked) {
                                                                    field.onChange([...currentValues, color]);
                                                                } else {
                                                                    field.onChange(() => currentValues.filter((s) => s !== color))
                                                                }
                                                            }} />
                                                            <label htmlFor="sizes" className="text-sm flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full"
                                                                    style={{ backgroundColor: color }} />
                                                                {color}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {field.value && field.value.length > 0 && (
                                                    <div className="mt-8 space-y-4">
                                                        <p className="text-sm font-medium">Upload Images for Selected Colors</p>
                                                        {field.value.map((color) => (
                                                            <div className="flex items-center gap-2" key={color}>
                                                                <div className="w-2 h-2 rounded-full"
                                                                    style={{ backgroundColor: color }} />
                                                                <span className="text-sm min-w-[60px]">{color}</span>
                                                                <Input type="file" accept="image/*" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Enter the available sizes for the product
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
            </ScrollArea>
        </SheetContent>
    )
}