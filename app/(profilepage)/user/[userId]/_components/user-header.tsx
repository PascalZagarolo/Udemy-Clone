'use client'

import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { AlertTriangle, CoffeeIcon, Forward, LogOut, LucideAirVent, Mail, MoreVerticalIcon, Share, User2 } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Label } from "recharts";

interface UserHeaderProps {
    user: User;
    imageUrl: string;
    isOwnSite : boolean;
}


const UserHeader: React.FC<UserHeaderProps> = ({
    user,
    imageUrl,
    isOwnSite
}) => {

    const getFirstUserLetter = () => {
        return user.username.charAt(0)
    }

    const formattedDate = () => {
        const date = new Date(user.createdAt)
        return date.toLocaleDateString()
    }

    const router = useRouter();
    const pathname = usePathname();

    const chatPage = pathname?.includes('/chat')



    return (
        <>
            <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
                <div className="w-full ml-8 opacity-100 ">
                    <div>
                        <h3 className="text-4xl font-semibold flex justify-items-start items-center justify-center cursor-default" onSelect={() => {return false}}>
                            <p className="text-blue-800 text-4xl font-bold" > {user.username.charAt(0)} </p> {user.username.substring(1, user.username.length)}
                            {!isOwnSite && (
                                chatPage  ? (
                                    <User2 className="mt-4 ml-8 mr-2" onClick={() => {router.push(`/user/${user.id}`)}}/>
                                ) : (
                                    <Mail className="mt-4 ml-8 mr-2" onClick={() => {router.push(`${user.id}/chat`)}}/>
                                )
                            )   
                            }
                            
                            
                            <div className="flex gap-x-2 ml-auto items-center">
                                <Link href="/" className="flex items-center mt-4">
                                    <Button size="sm" variant="ghost" className="items-center">
                                        <LogOut className="h-4 w-4 mr-2 items-center" />
                                        Verlassen.
                                    </Button>
                                </Link>
                                <div className="items-center flex justify-center mt-4 mr-4 sm:mr-8 md:mr-8">
                                    <UserButton
                                        afterSignOutUrl="/"
                                    />
                                </div>
                            </div>
                        </h3>

                    </div>
                    <h1 className="text-medium font-semibold text-gray-800/80 text-sm">
                        Mitglied seit  : {formattedDate()}
                    </h1>

                </div>
            </div>
        </>
    );
}

export default UserHeader;