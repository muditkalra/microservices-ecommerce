import { Copyright } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className='mt-16 flex flex-col items-center gap-8 md:flex-row md:items-stretch md:justify-between md:gap-0 bg-gray-800 p-8 rounded-t-lg'>
            <div className="flex flex-col gap-6 items-center md:items-start">
                <Link href={"/"} className='flex items-center gap-2'>
                    <Image src="/bagIcon.png" alt='Logo' width={22} height={22} className='' />
                    <p className='hidden md:block font-medium tracking-wider text-white'>Bazaar</p>
                </Link>
                <div className="">
                    <p className='text-sm text-gray-400 flex gap-2 items-center'><Copyright className='w-4 h-4' />Bazaar 2025</p>
                    <p className='text-sm text-gray-400'>All rights reserved</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className='text-sm text-amber-50 '>Links</p>
                <Link href={"/"}> Homepage</Link>
                <Link href={"/"}> Contact</Link>
                <Link href={"/"}> Terms of Service</Link>
                <Link href={"/"}> Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className='text-sm text-amber-50'>Links</p>
                <Link href={"/"}> All Product</Link>
                <Link href={"/"}> New Arrivals</Link>
                <Link href={"/"}> Best Sellers</Link>
                <Link href={"/"}> Sale</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className='text-sm text-amber-50'>Links</p>
                <Link href={"/"}> About</Link>
                <Link href={"/"}> Career</Link>
                <Link href={"/"}> Blog</Link>
                <Link href={"/"}> Affiliate Program</Link>
            </div>
        </div>
    )
}
