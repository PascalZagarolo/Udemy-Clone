import SideBar from "@/app/(dashboard)/_components/Sidebar";

import { db } from "@/lib/db";
import { auth, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserHeader from "@/app/(profilepage)/user/[userId]/_components/user-header";
import { Children } from "react";
import ChatSideBar from "./chat/_components/chat-sidebar";
import { Button } from "@/components/ui/button";


const ChatLayout = async (
  { children, }: { children: React.ReactNode }
) => {

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const ownUser = await db.user.findUnique({
    where: {
      id: userId
    }
  })


  return (
    <div>
        <div className=" md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        
        
        <div className="sm:hidden md:flex md:pl-56 h-full flex-col fixed">
          
          <ChatSideBar />
            
            
          </div>
          <div>
          <SideBar
            createdProfile={true}
          />
          
        </div>
        </div>
        
      
          
      {children}
        
    </div>
  );
}

export default ChatLayout;