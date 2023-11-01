'use client';

import { BarChart3, Compass, Layout, List, Settings2Icon } from "lucide-react";
import Image from "next/image";
import SideBarItem from "./SideBarItem";
import { usePathname } from "next/navigation";
import Settings from "./Settings";
import { useState } from "react";


const guestRoutes = [
    {
        icon : Layout,
        label: 'Dashboard',
        href: "/"
    },
    {
        icon: Compass,
        label: "Durchsuchen..",
        href: "/search"
    }
]

const teacherRoutes = [
    {
        icon : List,
        label: 'Kurse',
        href: "/teacher/courses"
    },
    {
        icon: BarChart3,
        label: "Analytiken",
        href: "/teacher/analytics"
    }
]

interface SideBarRoutesProps {
    name : string;
    username : string;
}

const SideBarRoutes: React.FC<SideBarRoutesProps> = ({
    name,
    username
}) => {

    const pathname = usePathname();

    const isTeacherPage = pathname?.includes('/teacher');
    const [isOpen, setIsOpen] = useState(false);

    const routes = isTeacherPage ? teacherRoutes : guestRoutes
    return (
        <div> 
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SideBarItem 
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                />
            ))}
        </div>
        <div className="position: absolute bottom-0">
        <Settings 
            icon={Settings2Icon}
            label="Einstellungen"
            name = {name}
            username = {username} />
        </div>
        </div>
     );
}
 
export default SideBarRoutes;