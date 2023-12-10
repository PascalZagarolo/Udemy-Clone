import { redirect } from "next/navigation";
import ChatBox from "../_components/chat-box";
import ChatInput from "../_components/chat-input";
import { auth, clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";

const ChatPage = async ( { params }: { params: { userId: string } } ) => {

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
   );
}
 
export default ChatPage;