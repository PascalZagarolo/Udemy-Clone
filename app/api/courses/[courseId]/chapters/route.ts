import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { courseId : string }}
) {
    try {

        const { userId } = auth();
        const values = await req.json();

        if (!userId) { 
            return new NextResponse("Nicht autorisiert" ,{status : 401})
        }

        if(!params.courseId) {
            return new NextResponse("Kein passender Kurs wurde gefunden : " , { status : 404})
        }

        const lastChapter = await db.chapter.findFirst({
            where :{
                 courseId : params.courseId,
            }, orderBy : {
                position : "desc"
            }
        })

        const newPosition = lastChapter?.position ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data : {
                courseId : params.courseId,
                position : 2,
                ...values
            }
        })


        return NextResponse.json(chapter);

    } catch (error){
        console.log("FEHLER : /api/courses/[courseId]/chapters/route.ts POST");
        return new NextResponse("Etwas ist schief gelaufen  : ", { status : 500 })
    }
}