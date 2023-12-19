import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";
import ChatMessages from "./chat-messages";
import { it } from "node:test";

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

    const ownName = await db.user.findUnique({
        where : {
            id : userId
        }
    })

    const otherName = await db.user.findUnique({
        where :{
            id : otherUser
        }
    })

    let iterator = 0;

    

    
    return (
      
        <div className="mb-16">
            <div className="grid mb-16">
            {messages.map((message) => (
                message.userId !== userId ? (
                    <div className="flex flex-col mb-2 ml-4" key={message.id}>
                    <div className="ml-4 mr-80">
                        <ChatMessages 
                        content={message.content!}
                        ownMessage={false}
                        date = {message.createdAt}
                        imageUrl={message.imageUrl ? message.imageUrl : ""}
                        userName = {otherName?.username!}
                        />
                    </div>
                    
                    </div>
                ) : (
                    <div className="flex flex-col mb-2 ml-auto" key={message.id}>
                    <div className="mr-4 rounded-md mb-2 ml-80">
                        <ChatMessages 
                        content={message.content!}
                        ownMessage={true}
                        date = {message.createdAt}
                        imageUrl={message.imageUrl ? message.imageUrl : ""}
                        userName = {ownName?.username!} 
                        messageId={message.id}
                        />
                    </div>
                    </div>
                    
                )
                
            )
            
            ) }
            </div>
            </div>
            
    )

      
}
 
export default ChatBox;