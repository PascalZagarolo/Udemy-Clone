import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Contact2, User, User2 } from "lucide-react";
import Image from "next/image";
import ChatSideBarItem from "./chat-sidebar-item";

const ChatSideBar = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const createdChats = await db.conversation.findMany({
        where: {
            OR: [
                {
                    user1Id: userId
                }, {
                    user2Id: userId
                }
            ]

        }, include: {
            user1: true,
            user2: true
        }
    })

    let i = 0;

    return (
        <div className="w-full hidden md:block">
            <div className="ml-8">
                <p className="text-3xl font-semibold mt-4  mr-8 flex items-center">
                    <p className="justify-center items-center mr-2"><Contact2 /></p>
                    Chats
                </p>
                <p className="text-medium font-semibold text-gray-800/80 text-sm mt-1 "> existierende Chats ansehen </p>
            </div>
            <div className="ml-4 mt-2">
            {createdChats.map((chat) => (
                
                    <ChatSideBarItem
                    key={i++}
                    user1Id={chat.user1Id}
                    user2Id={chat.user2Id}
                    userId={userId}
                    user1_username={chat.user1.username}
                    user2_username={chat.user2.username}
                    user1_imageUrl= {chat.user1.imageUrl || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                    user2_imageUrl= {chat.user2.imageUrl || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                    />
                    
                    
                )
                )}
            </div>
        </div>
    );
}

export default ChatSideBar;