'use client';

import { cn } from "@/lib/utils";
import { LucideIcon, icons } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


interface SideBarItemProps {
    
    icon : LucideIcon
    label : string;
    href : string;
}


const SideBarItem: React.FC<SideBarItemProps> = ({
    href,
    icon : Icon,
    label
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === "/" && href === "/") || 
    pathname === href ||  
    pathname?.startsWith(`${href}/`)

    const onClick = () => {
        console.log(pathname)
        router.push(href);
    }

    return ( 
        <button 
        type="button"
        onClick={onClick}
        className={cn(`
        flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20`,
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700")} >
            <div className="flex items-center gap-x-2 py-4 ">
                <Icon 
                    size={24}
                    className={cn(`text-slate-500`, isActive && "text-sky-700")}/>
                
                {label}
            </div>
            <div className={cn(`ml-auto opacity-0 border-2 border-sky-700  transition-all mr-4 w-2 h-2 bg-sky-700 rounded-full`, isActive && "opacity-100")}/>

            
        </button>
     );
}
 
export default SideBarItem;