import { db } from "@/lib/db";
import { auth, redirectToSignIn, useUser } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
) {
    try {
        
        const { userId } = await auth();

        if(!userId) {
            redirectToSignIn()
        }

        const values = await req.json();

        const createProfile = await db.user.create({
            data : {
                id : userId,
                ...values
            }
        })

        return NextResponse.json(createProfile)

        

    } catch(error){
        console.log("Fehler in /api/profile POST");
        return new NextResponse("Interner Server Error" , { status : 500})
    }
}


export async function GET(
    req : Request,
    
) {
    try {

        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        const user = await db.user.findUnique({
            where : {
                id : userId
            }
        })

        return NextResponse.json(user);
    
    } catch(error) {
        console.log("Fehler in /api/profile/[profileId] GET");
        return new NextResponse("Interner Server Error" , { status : 500})
    }
}



export async function PATCH(
    req : Request,
) {
     try {

        const { userId } = auth();

        const values = await req.json();

        if (!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        const patchedProfile = await db.user.update({
            where : {
                id : userId
            } , data : {
                ...values
            }
        })
        

        return NextResponse.json(patchedProfile);
     } catch(error) {
        console.log("Fehler in /api/profile route.ts PATCH");
        return new NextResponse("Interner Server Error" , { status : 500})
     }
}