import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import { NextResponse } from "next/server";

export async function DELETE (
    req : Request,
    { params } : { params : { messageId : string }}
) {
    try {

        const { userId } = auth();

        const findMessage = await db.message.findUnique({
            where : {
                id : params.messageId
            }
        })

        if(!findMessage) {
            return new NextResponse("Nachricht nicht gefunden" , { status : 404 })
        }

        if(findMessage?.userId !== userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        };


        const deletedMessage = await db.message.delete({
            where : {
                id : params.messageId
            }
        })

        return NextResponse.json(deletedMessage)

    } catch (error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}

export async function PATCH (
    req : Request,
    { params } : { params : { messageId : string }}
) {
    try {
        const { userId } = auth();

        const values = await req.json();

        const findMessage = await db.message.findUnique({
            where : {
                id : params.messageId
            }
        })

        if (!findMessage) {
            return new NextResponse("Nachricht nicht vorhanden" , { status : 404})
        }

        if(findMessage.userId !== userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        const editedMessage = await db.message.update({
            where : {
                id : params.messageId
            }, data : {
                content : values.content,
                isEdited : true
            }
        })

        return NextResponse.json(editedMessage);

        
    } catch(error) {
        console.log(error);

        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}