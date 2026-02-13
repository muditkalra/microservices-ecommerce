import AppLineChart from '@/components/AppLineChart'
import EditUser from '@/components/EditUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { auth, type User } from '@clerk/nextjs/server'
import { BadgeCheck, Candy, Citrus, Edit, Shield } from 'lucide-react'
import Link from 'next/link'


const getData = async (id: string): Promise<User | null> => {
    const { getToken } = await auth();
    const token = await getToken();
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err, "error");
        return null;
    }
};

export default async function SingleUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getData(id);

    if (!data) {
        return <div className="flex flex-col justify-center items-center gap-4">
            <div className="">
                No User found
            </div>
            <Link href={"/"}>
                <Button variant={"link"} >
                    home
                </Button>
            </Link>
        </div>
    }

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{(data?.firstName + " " + data?.lastName ? data?.lastName : "") || (data?.username) || "-"}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* container */}

            <div className="mt-4 flex flex-col xl:flex-row gap-8">
                {/* left */}
                <div className="w-full xl:w-1/3 space-y-6">
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className="text-xl font-semibold">
                            User badges
                        </h1>
                        <div className="flex gap-4 mt-4">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <BadgeCheck size={36} className='rounded-full bg-blue-500/30 border border-blue-500/50 p-2' />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className='font-bold mb-2'> Verified User</h1>
                                    <p className='text-sm text-muted-foreground'>This user has been verified by the admin</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Shield
                                        size={36}
                                        className="rounded-full bg-green-800/30 border border-green-800/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Admin</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Admin users have access to all features and can manage
                                        users.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Candy
                                        size={36}
                                        className="rounded-full bg-yellow-500/30 border border-yellow-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Awarded</h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been awarded for their contributions.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Citrus
                                        size={36}
                                        className="rounded-full bg-orange-500/30 border border-orange-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Popular</h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been popular in the community.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>

                    {/* User Card container */}
                    <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
                        <div className="flex item-center gap-2">
                            <Avatar className=''>
                                <AvatarImage src={data?.imageUrl} alt='profile image' />
                                <AvatarFallback>{(data?.firstName?.charAt(0) + " " + data?.lastName ? data?.lastName?.charAt(0) : "") || (data?.username?.charAt(0))}</AvatarFallback>
                            </Avatar>
                            <h1>
                                {(data?.firstName + " " + data?.lastName ? data?.lastName : "") || (data?.username)} | <span className='text-muted-foreground'>{data?.emailAddresses[0]?.emailAddress} </span>
                            </h1>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo aut consequuntur obcaecati nulla illum sunt.
                        </p>
                    </div>

                    {/* User Information container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold">
                                User Information
                            </h1>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button>
                                        Edit User <Edit />
                                    </Button>
                                </SheetTrigger>
                                <EditUser />
                            </Sheet>
                        </div>
                        <div className="space-y-4 mt-4 ">
                            <div className="flex flex-col gap-2 mb-8 ">
                                <p className='text-sm text-muted-foreground'>
                                    Profile completion
                                </p>
                                <Progress value={66} />
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Full name:</span><span>  {(data?.firstName + " " + data?.lastName ? data?.lastName : "") || (data?.username) || "-"}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Email</span><span> {data.emailAddresses[0]?.emailAddress || "-"}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Phone:</span><span> {data.phoneNumbers[0]?.phoneNumber || "-"}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Role</span><span>{String(data.publicMetadata?.role) || "user"}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Status</span><span> {data.banned ? "banned" : "active"}</span>
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground mt-4'> Joined on {new Date(data.createdAt).toLocaleDateString("en-IN")}</p>
                    </div>

                </div>
                <div className="w-full xl:w-2/3 space-y-6">
                    {/* User Card container  */}


                    {/* chart container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className='text-xl font-semibold'> User Activity</h1>
                        <AppLineChart />
                    </div>

                </div>
            </div>
        </div>
    )
}
