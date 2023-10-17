import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { courseId : string , chapterId : string }}
) {
    try {

        console.log(params.courseId)
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        const { courseId , chapterId } = params;

        const values = await req.json();

        const comment = await db.comments.create({
            data : {
                userId,
                chapterId,
                ...values
            }
        })

        return NextResponse.json(comment)

    } catch(error){
        console.log("Fehler in /api/courses/[courseId]/chapters/[chapterId]/comments/route.ts");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}