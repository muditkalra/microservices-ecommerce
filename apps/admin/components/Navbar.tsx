import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
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
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/127347821" alt='profile image' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10} align='end'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className='h-[1.2rem] w-[1.2rem] mr-2' />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem variant='destructive'>
                            <LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
