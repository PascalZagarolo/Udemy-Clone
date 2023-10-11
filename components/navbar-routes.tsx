'use client';

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { CoffeeIcon, Link2, LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";

const NavBarRoutes = () => {

    const pathname = usePathname();

    const router = useRouter();

    const isTeacherPage = pathname?.startsWith('/teacher');
    const isPlayerPage = pathname?.includes('/chaper');
    const isSearchPage = pathname?.includes("/search")



    return (
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isPlayerPage ? (
            <Link href="/">
                <Button size="sm" variant="ghost">
                    <LogOut  className="h-4 w-4 mr-2"/>
                    Verlassen.
                </Button>
            </Link>
            ): (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        <CoffeeIcon className="h-4 w-4 mr-2" />
                        Lehrer werden
                    </Button>
                </Link>
            )}
            <UserButton
                afterSignOutUrl="/"
            />
        </div>
        </>
     );
}
 
export default NavBarRoutes;