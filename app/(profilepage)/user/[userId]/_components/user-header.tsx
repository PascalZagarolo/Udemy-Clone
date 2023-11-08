'use client'

import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { CoffeeIcon,  LogOut } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Label } from "recharts";

interface UserHeaderProps {
    user : User 
}


const UserHeader: React.FC<UserHeaderProps> = ({
    user
}) => {

    const getFirstUserLetter = () => {
         return user.username.charAt(0)
    }

    const formattedDate = () => {
        const date = new Date(user.createdAt)
        return date.toLocaleDateString()
    }

    

    return (
        <>
        <div className="w-full mt-4">
            <div>
                <h3 className="text-4xl font-semibold flex justify-items-start "> 
                    <p className="text-blue-800 text-5xl font-bold"> {user.username.charAt(0)} </p> {user.username.substring(1, user.username.length)}
                    <div className="flex gap-x-2 ml-auto">
                    <Link href="/">
                <Button size="sm" variant="ghost" className="mr-4">
                    <LogOut  className="h-4 w-4 mr-2"/>
                    Verlassen.
                </Button>
                </Link>
            </div>
                </h3>
                
            </div>
            <h1 className="text-medium font-semibold text-gray-800/80">
                Mitglied seit  : {formattedDate()}
            </h1>
            <div>
                <Separator className="w-full bg-black"/>
            </div>
        </div>
        </>
     );
}
 
export default UserHeader;