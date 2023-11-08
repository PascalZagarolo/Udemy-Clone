import { db } from "@/lib/db";
import UserHeader from "./_components/user-header";
import { redirect } from "next/navigation";
import UserMainContent from "./_components/user-main-content";
import { auth, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import SideBar from "@/app/(dashboard)/_components/Sidebar";

const UserMainPage = async ({
    params
} : {  params  : { userId : string } })  => {


    const user = await db.user.findUnique({
        where : {
            id : params.userId
        }
    })

    const clerkUser = await clerkClient.users.getUser(user?.id || "");

    const imageUrl = clerkUser.imageUrl;

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
      imageUrl = {imageUrl}
      />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
      <SideBar
                createdProfile = {createdProfile} 
                />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <UserMainContent
        user={user}
        imageUrl = {imageUrl}
        />
      </main>
    </div>
     );
}
 
export default UserMainPage;