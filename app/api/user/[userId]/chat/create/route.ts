import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { create } from 'zustand';

export async function POST(
    req : Request,
    { params } : { params : { userId : string }}
) {
    try {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Nicht autorisiert", { status : 401});
        }
        
        let createdChat;

        createdChat = await db.conversation.findMany({
            where : {
                OR : [
                    {
                        user1Id : userId,
                        user2Id : params.userId
                    },
                    {
                        user1Id : params.userId,
                        user2Id : userId
                    }
                ]
            }
        })

        if(!createdChat) {
            createdChat = await db.conversation.create({
                data : {
                    user1Id : userId,
                    user2Id : params.userId
                }
            })
        }

        return NextResponse.json(createdChat);

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}