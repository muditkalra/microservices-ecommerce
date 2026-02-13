import { Calendar, ChevronUp, Home, Inbox, LucideIcon, Plus, Search, Settings, Shirt, ShoppingBasket, User, User2 } from 'lucide-react';
import Link from 'next/link';
import AddCategory from './AddCategory';
import AddOrder from './AddOrder';
import AddProduct from './AddProduct';
import AddUser from './AddUser';
import Logo from './Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sheet, SheetTrigger } from './ui/sheet';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from './ui/sidebar';

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
		url: "/",
		icon: Inbox
	},
	{
		title: "Calender",
		url: "/",
		icon: Calendar
	},
	{
		title: "Search",
		url: "/",
		icon: Search
	},
	{
		title: "Setting",
		url: "/",
		icon: Settings
	},
]


export default function AppSideBar() {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className="py-4">
				<SidebarMenu>
					<SidebarMenuItem >
						<SidebarMenuButton asChild>
							<Link href={"/"}>
								<Logo size={110} />
								{/* <Image src="/logo3.png" alt='logo' width={100} height={100} /> */}
								{/* <span>Bazaar</span> */}
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
										<Link href={item.url}>
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
						Products
					</SidebarGroupLabel>
					<SidebarGroupAction>
						<Plus /> <span className='sr-only'> Add Project</span>
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href={"/products"}>
										<Shirt />
										<span>See All Products</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href={"#"}>
													<Plus />
													<span>Add Product</span>
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>
										<AddProduct />
									</Sheet>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href={"#"}>
													<Plus />
													<span>Add Category</span>
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>
										<AddCategory />
									</Sheet>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>
						Users
					</SidebarGroupLabel>
					<SidebarGroupAction>
						<Plus /> <span className='sr-only'> Add Project</span>
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href={"/users"}>
										<User />
										<span>See All Users</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href={"#"}>
													<Plus />
													<span>Add User</span>
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>
										<AddUser />
									</Sheet>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>
						Orders/ Payments
					</SidebarGroupLabel>
					<SidebarGroupAction>
						<Plus /> <span className='sr-only'> Add Project</span>
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href={"/orders"}>
										<ShoppingBasket />
										<span>See All Transactions</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href={"#"}>
													<Plus />
													<span>Add Order</span>
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>
										<AddOrder />
									</Sheet>
								</SidebarMenuButton>
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
