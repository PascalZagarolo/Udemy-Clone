import SideBar from "@/app/(dashboard)/_components/Sidebar";
import UserHeader from "../_components/user-header";
import { db } from "@/lib/db";
import { auth, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const UserChat = async (
    { params } : { params : { userId : string}}
   ) => {

    const user = await db.user.findUnique({
        where : {
            id : params.userId
        }
    })

    const isOwnSite = params.userId === auth().userId ? true : false;

    if(!user) {
        return redirect("/");
    }

    const clerkUser = await clerkClient.users.getUser(user?.id || "");

    const imageUrl = clerkUser.imageUrl;
    
    return ( 
        <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
      <UserHeader 
            user = {user}
            imageUrl = {imageUrl}
            isOwnSite = {isOwnSite}
            />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
    
      <SideBar 
      createdProfile = {true}
      />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
      <div>
        Platzhalter
      </div>
      </main>
    </div>
     );
}
 
export default UserChat;