import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'
import { Bell, Home, ShoppingCart } from 'lucide-react'
import ShoppingCartIcon from './ShoppingCartIcon'

export default function Navbar() {
    return (
        <nav className='flex justify-between items-center border-b border-gray-200 pb-2 mb-4'>
            {/* Left */}
            <Link href={"/"} className='flex items-center gap-2'>
                <Image src={"/next.svg"} alt='Logo' width={56} height={56} className='w-6 h-6 md:w-14 md:h-14' />
                <p className=' hidden md:block font-medium tracking-wider'>Bazaar</p>
            </Link>

            {/* Right */}
            <div className="flex items-center gap-6">
                <SearchBar />
                <Link href={"/"}>
                    <Home className='w-4 h-4 text-gray-600' />
                </Link>
                <Bell className='w-4 h-4 text-gray-600' />
                <ShoppingCartIcon />
                <Link href={"/login"}> Sign in</Link>
            </div>
        </nav>
    )
}
