import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Contact2, User, User2 } from "lucide-react";
import Image from "next/image";

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

    return (
        <div className="w-full">
            <div className="ml-8">
                <p className="text-3xl font-semibold mt-4  mr-8 flex items-center">
                    <p className="justify-center items-center mr-2"><Contact2 /></p>
                    Chats
                </p>
                <p className="text-medium font-semibold text-gray-800/80 text-sm mt-1 "> existierende Chats ansehen </p>
            </div>
            <div className="ml-4 mt-2">
                {createdChats.map((chat) => (
                    <div className="flex justify-start items-center mt-4" key={chat.id}>
                    <div className="items-center">
                    {chat.user1Id === userId ? (
                            <Image 
                            src={chat.user2.imageUrl || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                            className="rounded-full"
                            height={40}
                            width={40}
                            alt="Profile Picture"
                            />
                        ) : (
                            chat.user1.username
                        )}
                    </div>
                    <User2
                    className="h-4 w-4 ml-2 font-bold"
                    />
                    <p className="font-semibold ml-2">
                        {chat.user1Id === userId ? (
                            chat.user2.username
                        ) : (
                            chat.user1.username
                        )}
                    </p>
                    
                </div>
                ))}
            </div>
        </div>
    );
}

export default ChatSideBar;