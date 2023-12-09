import SideBar from "@/app/(dashboard)/_components/Sidebar";
import UserHeader from "../_components/user-header";
import { db } from "@/lib/db";
import { auth, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatInput from "./_components/chat-input";
import ChatBox from "./_components/chat-box";
import ChatSideBar from "./_components/chat-sidebar";


const UserChat = async (
  { params }: { params: { userId: string } }
) => {

  const user = await db.user.findUnique({
    where: {
      id: params.userId
    }
  })

  const isOwnSite = params.userId === auth().userId ? true : false;

  if (!user) {
    return redirect("/");
  }

  const clerkUser = await clerkClient.users.getUser(user?.id || "");

  const imageUrl = clerkUser.imageUrl;

  return (
    <div className="">

      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar
          createdProfile={true}
        />

      </div>
      <div className="sm:hidden md:flex md:pl-56 h-full w-34 flex-col fixed  ">
        <ChatSideBar />

      </div>
      <div className="md:pl-56">
        <div className="md:pl-52 w-full z-50 h-[80px]">
          <UserHeader
            user={user}
            imageUrl={imageUrl}
            isOwnSite={isOwnSite}
          />
        </div>
        <main className="md:pl-80 pt-[80px] h-full">
      <div className=" mt-4">
          <ChatBox 
          otherUser = {params.userId}
          />
       
        <div className="position: absolute bottom-4 flex items-center">
          <ChatInput/>
        </div>
      </div>
      </main>



      </div>
    </div>
  );
}

export default UserChat;