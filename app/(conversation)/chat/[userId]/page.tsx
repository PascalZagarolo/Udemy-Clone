import { redirect } from "next/navigation";
import ChatBox from "../_components/chat-box";
import ChatInput from "../_components/chat-input";
import { auth, clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";
import UserHeader from "@/app/(profilepage)/user/[userId]/_components/user-header";

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

  

  

  return ( 
    <div className="md:pl-52" >
            <div className="md:pl-56 w-full h-[80px]">
      <UserHeader
                    user={user}
                    imageUrl={user.imageUrl || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                    isOwnSite={false}
                />
      <div className=" mt-4">
          <ChatBox 
          otherUser = {params.userId}
          />
       
        <div className="position: absolute bottom-4 flex items-center">
          <ChatInput/>
        </div>
      </div>
      </div>
      </div>
   );
}
 
export default ChatPage;