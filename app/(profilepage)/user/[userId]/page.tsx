import { db } from "@/lib/db";
import UserHeader from "./_components/user-header";
import { redirect } from "next/navigation";
import UserMainContent from "./_components/user-main-content";
import { auth } from "@clerk/nextjs";

const UserMainPage = async ({
    params
} : {  params  : { userId : string } })  => {


    const user = await db.user.findUnique({
        where : {
            id : params.userId
        }
    })

    if(!user) {
        return redirect("/");
    }

    const { userId } = auth();

    return ( 
        <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
      <UserHeader 
      user = {user}
      />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        
      </div>
      <main className="md:pl-80 pt-[80px] h-full mt-16">
        { userId === params.userId && (
            <div>
                eigenes Profil!!!
            </div>
        )}
        <UserMainContent
        user={user}
        />
      </main>
    </div>
     );
}
 
export default UserMainPage;