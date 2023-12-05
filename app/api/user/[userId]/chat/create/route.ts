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
        
        

        const existingChat = await db.conversation.findUnique({
            where : {
                user1Id_user2Id : {
                    user1Id : userId,
                    user2Id : params.userId
                }
            }
        })

        if(!existingChat){
            const existingChat = await db.conversation.findUnique({
                where : {
                    user1Id_user2Id : {
                        user2Id : userId,
                        user1Id : params.userId
                    }
                }
            })
        }
        

        if(!existingChat) {
           const existingChat = await db.conversation.create({
                data : {
                    user1Id : userId,
                    user2Id : params.userId
                }
            })
        }

        return NextResponse.json(existingChat);

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}