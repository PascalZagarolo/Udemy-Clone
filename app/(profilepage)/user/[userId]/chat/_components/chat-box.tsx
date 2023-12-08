import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";
import ChatMessages from "./chat-messages";

interface ChatBoxProps {
    otherUser : string
}

const ChatBox: React.FC<ChatBoxProps> = async ({
    otherUser
}) => {

    const { userId } = auth();

    if(!userId) {
        return redirectToSignIn();
    }
    const conversation = await db.conversation.findMany({
        where : {
            OR: [
                {
                   user1Id: otherUser,
                   user2Id: userId 
                }, {
                    user1Id: userId,
                    user2Id: otherUser
                }
            ]
        }
    })

    const messages = await db.message.findMany({
        where : {
            conversationId : conversation[0].id
        }
    })

    
    return (
        <div className="flex flex-col mb-4 ml-4">
            {messages.map((message) => (
                message.userId !== userId ? (
                    <div className="ml-4">
                        <ChatMessages 
                        content={message.content!}
                        
                        />
                    </div>
                ) : (
                    <div className="mr-4  rounded-md mb-2">
                        <ChatMessages 
                        content={message.content!}
                        
                        />
                    </div>
                )
            ))}
        </div>
    )
}
 
export default ChatBox;