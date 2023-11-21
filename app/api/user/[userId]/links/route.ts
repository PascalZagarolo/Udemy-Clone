import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { userId : string }}
) {
    try {

        const { userId } = auth();

        if(userId !== params.userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401 })
        }

        const values = await req.json();

        const updatedSocialLinks = await db.socialLinks.updateMany({
            data : {
                username : values.username,
                
            }
        })



    } catch(error) {
        console.log("Fehler in PATCH /user/[userId]/links/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}