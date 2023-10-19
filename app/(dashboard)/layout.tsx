import { auth, redirectToSignIn } from "@clerk/nextjs";
import NavBar from "./_components/Navbar";
import SideBar from "./_components/Sidebar";

import { db } from "@/lib/db";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import InitializeProfileBox from "./_components/initalize-profile";




const DashboardLayout = async ({
    children
}: {
    children : React.ReactNode
}) => {

    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    let createdProfile = false;

    const userProfile = await db.user.findUnique({
        where : {
            id : userId
        }
    })

    userProfile ? createdProfile = true : createdProfile = false;

   

    return ( 
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <NavBar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <SideBar 
                />
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
            <InitializeProfileBox 
            isOpen={!createdProfile}
            />
            {children}
            </main>
        </div>
     );
}
 
export default DashboardLayout;