"use client";

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
    const [value, setValue] = useState("");
    const searchParam = useSearchParams();
    const router = useRouter();

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParam);
        params.set("search", value);
        router.push(`/products?${params.toString()}`, { scroll: false });
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            handleSearch(value);
        }
    }

    return (
        <div className='hidden sm:flex items-center gap-2 rounded-sm ring-1 ring-gray-200 px-2 py-1 shadow-md'>
            <Search className='w-4 h-4 text-gray-500' />
            <input id="search" placeholder='Search...' className='text-sm outline-0' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}
