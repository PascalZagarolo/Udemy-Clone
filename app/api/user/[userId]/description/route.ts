import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { userId : string}}
) {
    try {

        const { userId } = auth();

        if (userId !== params.userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401 });
        }

        const { description } = await req.json();

        if(!description) {
            return new NextResponse("Fehlende Daten" , { status : 400 });
        }

        const patchedUser = await db.user.update({
            where : {
                id : params.userId
            }, data : {
                description : description
            
            }
        })

        return NextResponse.json(patchedUser);


    } catch (error) {

        console.log("Fehler in PATCH /user/[userId]/description/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}