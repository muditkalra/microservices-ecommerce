import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { Bell, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ProfileButton from './ProfileButton'
import SearchBar from './SearchBar'
import ShoppingCartIcon from './ShoppingCartIcon'

export default function Navbar() {
    return (
        <nav className='flex justify-between items-center border-b border-gray-200 pb-2 mb-4'>
            {/* Left */}
            <Link href="/" className='flex items-center gap-2'>
                <Image src="/logo-dark.png" alt='Logo' width={100} height={100}  />
                {/* <p className='hidden md:block font-medium tracking-wider'>Bazaar</p> */}
            </Link>

            {/* Right */}
            <div className="flex items-center gap-6">
                <SearchBar />
                <Link href="/">
                    <Home className='w-4 h-4 text-gray-600' />
                </Link>
                <Bell className='w-4 h-4 text-gray-600' />
                <ShoppingCartIcon />
                <SignedOut >
                    <SignInButton>
                        <button className='cursor-pointer'>
                            Sign in
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <ProfileButton />
                </SignedIn>
            </div>
        </nav>
    )
}
