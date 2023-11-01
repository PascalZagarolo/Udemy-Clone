import NavBarRoutes from "@/components/navbar-routes";
import MobileSideBar from "./MobileSideBar";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { usePathname } from "next/navigation";

interface NavBarProps {
    createdProfile : boolean;
}





const NavBar: React.FC<NavBarProps> = async ({
    createdProfile
}) => {
    const { userId } = auth();
    let username = ""

    if(userId) {
        const user = await db.user.findUnique({
            where : {
                id : userId
            }
        })

        username = user?.name || ""
    }

    
    

    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSideBar createdProfile = { createdProfile } />
            
            <NavBarRoutes username = {username} />
        </div>
     );
}
 
export default NavBar;