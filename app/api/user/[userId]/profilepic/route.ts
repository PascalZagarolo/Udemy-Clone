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
        
        
        for (let i = 0; i < values.length; i++) {

            values.LinkType = values.LinkType.toUpperCase();

            const updatedLink = await db.socialLinks.update({
                where : {
                    LinkType : values.LinkType,
                }, data : {
                    username : values.username,
                }
            })

            return NextResponse.json(updatedLink);
        }

        

    } catch {
        console.log("FEHLER : /api/user/[userId]/profilepic PATCH");
        return new NextResponse("Interner Server Error" , { status : 500});

    }
}