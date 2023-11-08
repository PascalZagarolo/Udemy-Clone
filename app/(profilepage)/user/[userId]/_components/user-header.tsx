'use client'

import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { AlertTriangle, CoffeeIcon,  Forward,  LogOut, Mail, MoreVerticalIcon, Share } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Label } from "recharts";

interface UserHeaderProps {
    user : User;
    imageUrl : string 
}


const UserHeader: React.FC<UserHeaderProps> = ({
    user,
    imageUrl
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
        <div className="w-full mt-4 ml-8">
            <div>
                <h3 className="text-4xl font-semibold flex justify-items-start ">
                    
                    <p className="text-blue-800 text-5xl font-bold"> {user.username.charAt(0)} </p> {user.username.substring(1, user.username.length)}
                    
                    <Mail className="mt-4 ml-16 mr-2"/>
                    <AlertTriangle className="mt-4 ml-4 mr-2"/>   
                    <Forward className="mt-4 ml-4 mr-2"/>
                    <div className="flex gap-x-2 ml-auto">
                    <Link href="/">
                <Button size="sm" variant="ghost" className="mr-12">
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
            
        </div>
        </>
     );
}
 
export default UserHeader;