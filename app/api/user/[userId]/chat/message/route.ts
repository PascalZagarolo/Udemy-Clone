import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Nicht autorisiert", { status: 401 })
        }

        const values = await req.json();

        const existingConversation = await db.conversation.findMany({
            where: {
                OR: [
                    {
                        user1Id: userId,
                        user2Id: params.userId
                    }, {
                        user1Id: params.userId,
                        user2Id: userId
                    }
                ]


            },
        })

        if(!existingConversation) {
            const existingConversation = await db.conversation.create({
                data : {
                    user1Id : params.userId,
                    user2Id : userId
                }
            })
        }

        if(values.url) {
            const createdMessage = await db.message.create({
                data : {
                    conversationId : existingConversation[0].id,
                    userId : userId,
                    imageUrl: values.url,
                    content : values.url
                }
            })

            return NextResponse.json(createdMessage);

        } else {

            const createdMessage = await db.message.create({
                data : {
                    conversationId : existingConversation[0].id,
                    userId : userId,
                    content : values.content
                }
            })

            return NextResponse.json(createdMessage);
        }

        

        
    } catch (error) {
        console.log(error)
    }
}