import { db } from "@/lib/db";
import UserHeader from "./_components/user-header";
import { redirect } from "next/navigation";
import UserMainContent from "./_components/user-main-content";
import { auth, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import SideBar from "@/app/(dashboard)/_components/Sidebar";
import SideBarRoutes from "@/app/(dashboard)/_components/SideBarRoutes";
import Logo from "@/app/(dashboard)/_components/Logo";
import Image from "next/image";

const UserMainPage = async ({
    params
} : {  params  : { userId : string } })  => {


    const user = await db.user.findUnique({
        where : {
            id : params.userId
        }
    })
    
    


    const isOwnSite = params.userId === auth().userId ? true : false;

   

    if(!user) {
        return redirect("/");
    }

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
      <UserHeader 
            user = {user}
            imageUrl = { userProfile?.imageUrl || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" }
            isOwnSite = {isOwnSite}
            />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
    
      <SideBar 
      createdProfile = {true}
      />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
      <UserMainContent
        user={user}
        imageUrl = { userProfile?.imageUrl || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
        />
      </main>
    </div>
     );
}
 
export default UserMainPage;