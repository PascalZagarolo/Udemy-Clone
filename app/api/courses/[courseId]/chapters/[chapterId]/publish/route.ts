import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { courseId : string, chapterId : string}}
) {
    try {

       

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Nicht autorisiert : " , { status : 401 })
        }

        if (!params.courseId || !params.chapterId) {
            return new NextResponse("Keine passenden Tokens erhalten :  ", { status : 404})
        }

        const oldStateChapter = await db.chapter.findUnique({
            where : {
                id : params.chapterId,
                courseId : params.courseId
            }
        })

        const muxData = await db.muxData.findUnique({
            where : {
                id : params.chapterId
            }
        })

        /* if(!oldStateChapter || !muxData || !oldStateChapter.title || !oldStateChapter.description ||!oldStateChapter.videoUrl ) {
            return new NextResponse("Fehlende Kursinhalte : " , { status : 400})
        } */

        

        const newValue = oldStateChapter?.isPublished ? false : true;

       const chapter = await db.chapter.update({
        where : {
            id : params.chapterId,
        }, data : {
            isPublished : newValue
        }
       })

        return NextResponse.json(chapter);


    } catch(error) {
        console.log("Fehler in PATCH /api/courses/[courseId]/chapters/[chapterId   ");
        return new NextResponse("Ein Fehler ist aufgetreten : ", { status : 500})
    }
}