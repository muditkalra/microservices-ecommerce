import { Home, LucideIcon, Inbox, Calendar, Search, Settings, User2, ChevronUp, Plus, Projector, ChevronDown } from 'lucide-react';
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarSeparator } from './ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface item {
	title: string;
	url: string;
	icon: LucideIcon
}
const items: item[] = [
	{
		title: "Home",
		url: "/",
		icon: Home
	},
	{
		title: "Inbox",
		url: "#",
		icon: Inbox
	},
	{
		title: "Calender",
		url: "#",
		icon: Calendar
	},
	{
		title: "Search",
		url: "#",
		icon: Search
	},
	{
		title: "Setting",
		url: "#",
		icon: Settings
	},
]


export default function AppSideBar() {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className="py-4">
				<SidebarMenu >
					<SidebarMenuItem >
						<SidebarMenuButton asChild>
							<Link href={"/"}>
								<Image src={"./globe.svg"} alt='logo' width={20} height={20} />
								<span>Bazaar</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent className=''>
				<SidebarGroup>
					<SidebarGroupLabel>
						Application
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.title}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
									{item.title === "Inbox" && <SidebarMenuBadge className='bg-secondary rounded-lg'>
										24
									</SidebarMenuBadge>}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>
						Application
					</SidebarGroupLabel>
					<SidebarGroupAction>
						<Plus /> <span className='sr-only'> Add Project</span>
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href={"#"}>
										<Projector />
										<span>See All Projects</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href={"#"}>
										<Plus />
										<span>Add Project</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				{/* collapsible group */}
				<Collapsible defaultOpen className="group/collapsible">
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Help
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<Link href={"#"}>
												<Projector />
												<span>See All Projects</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<Link href={"#"}>
												<Plus />
												<span>Add Project</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>

				{/* Nested Menu */}
				<SidebarGroup>
					<SidebarGroupLabel>
						Application
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href={"#"}>
										<Projector />
										<span>See All Projects</span>
									</Link>
								</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<Link href={"#"}>
												<Plus />
												<span>Add Project</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> Admin
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>

						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar >
	)
}
