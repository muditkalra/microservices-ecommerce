import AppLineChart from '@/components/AppLineChart'
import CardList from '@/components/CardList'
import EditUser from '@/components/EditUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { BadgeCheck, Candy, Citrus, Edit, Shield } from 'lucide-react'

export default function SingleUserPage() {
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
                        <BreadcrumbPage>singleUser</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* containere */}

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
                                    <BadgeCheck size={36} className='rounded-full bg-blue-500/30 border-1 border-blue-500/50 p-2' />
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
                                        className="rounded-full bg-green-800/30 border-1 border-green-800/50 p-2"
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
                                        className="rounded-full bg-yellow-500/30 border-1 border-yellow-500/50 p-2"
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
                                        className="rounded-full bg-orange-500/30 border-1 border-orange-500/50 p-2"
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
                                <span className='font-bold'>Username:</span><span> Donald Trump</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Email</span><span> donaldtrump@presidentofusa.com</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Phone:</span><span> +1 999 999 0999</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Location</span><span> White house</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className='font-bold'>Role</span><span>
                                    <Badge>
                                        President
                                    </Badge>
                                </span>
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground mt-4'> Joined on 20 January, 2025</p>
                    </div>

                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <CardList title='Recent Transactions' />
                    </div>

                </div>
                <div className="w-full xl:w-2/3 space-y-6">
                    {/* User Card container  */}
                    <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
                        <div className="flex item-center gap-2">
                            <Avatar className=''>
                                <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" alt='profile image' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1>
                                Mudit kalra
                            </h1>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo aut consequuntur obcaecati nulla illum sunt.
                        </p>
                    </div>

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
