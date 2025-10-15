"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const Page = () => {
    const { signOut } = useAuth();
    return (
        <div className=" bg-black h-screen text-background flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl">You do not have an access!</h1>
            <div className="">
                <Button onClick={()=> signOut()} variant={"secondary"}>
                    Sign out
                </Button>
            </div>
        </div>
    );
};

export default Page;