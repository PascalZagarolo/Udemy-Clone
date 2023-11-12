import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { userId : string}}
) {
    try {
        
        const { userId } = auth();


        if(userId !== params.userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }


        const values = await req.json();
        

        

        const updatedProfile = await db.user.update({
            where : {
                id : userId
            }, data: {
                imageUrl : values.url
            }
        })

        return NextResponse.json(updatedProfile);

    } catch {
        console.log("FEHLER : /api/user/[userId]/profilepic PATCH");
        return new NextResponse("Interner Server Error" , { status : 500});

    }
}