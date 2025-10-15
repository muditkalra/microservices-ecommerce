import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { SidebarTrigger } from './ui/sidebar'


export default function Navbar() {
    return (
        <nav className='p-4 flex items-center justify-between sticky top-0 bg-background z-10'>
            <SidebarTrigger />
            <div className="flex items-center gap-4">
                <Link href={"/"}>
                    Dashboard
                </Link>

                {/* Theme toggle */}
                <ThemeToggle />

                {/* Profile dropdown */}
                <SignedIn>
                    {/* <ProfileButton /> */}
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
