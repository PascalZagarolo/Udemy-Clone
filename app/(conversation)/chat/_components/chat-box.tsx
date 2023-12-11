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
        }, orderBy : {
            createdAt : "asc"
        }
    })

    
    return (
        <>
        <div className="grid grid-cols-2 flex-col">
            {messages.map((message) => (
                message.userId !== userId ? (
                    <div className="flex flex-col mb-2 ml-4" key={message.id}>
                    <div className="ml-4">
                        <ChatMessages 
                        content={message.content!}
                        ownMessage={false}
                        />
                    </div>
                    </div>
                ) : (
                    <div className="flex flex-col mb-2 ml-auto col-start-2 col-end-2" key={message.id}>
                    <div className="mr-4 rounded-md mb-2">
                        <ChatMessages 
                        content={message.content!}
                        ownMessage={true}
                        />
                    </div>
                    </div>
                )
                
            ))}
            </div>
            </>
    )
}
 
export default ChatBox;