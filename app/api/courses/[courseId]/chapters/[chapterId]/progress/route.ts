import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req : Request,
    { params } : { params : { courseId : string, chapterId : string}}
) {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Nicht autorisiert");
        }

        const { isCompleted } = await req.json();

        const patchedProgress = await db.userProgress.upsert({
            where : {
                userId_chapterId : {
                    userId : userId,
                    chapterId : params.chapterId
                }
            }, update : {
                isCompleted : isCompleted
            }, create : {
                userId,
                chapterId : params.chapterId,
                isCompleted
            }
        })

        return NextResponse.json(patchedProgress)


        
    } catch(error){
        console.log("Fehler in PUT /api/courses/[courseId]/chapters/[chapterId]/progress", error);
        return new NextResponse("Etwas ist schief gelaufen " , { status : 500 })
    }
}