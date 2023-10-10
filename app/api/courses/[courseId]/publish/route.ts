import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { courseId : string }}
) {
    try {
        
        const { userId } = auth();
        
        if (!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        const course = await db.course.findUnique({
            where : {
                id : params.courseId
            }, include : {
                chapters : true
            }
        })

        if (!course) {
            return new NextResponse("Kein Kurs gefunden" , { status : 404})
        }

        const publishedChapters = course.chapters.some((chapter) => chapter.isPublished === true)

        if(!course.title || !course.description || !course.categoryId || !course.imageUrl || !publishedChapters ) {
            return new NextResponse("Nicht alle Pflichtfelder belegt : ", { status : 401})
        }

        const newValue = course.isPublished ? false : true;

        const patchedCourse = await db.course.update({
            where : {
                id : params.courseId
            }, data : {
                isPublished : newValue
            }
        })

        return NextResponse.json(patchedCourse);


    } catch(error) {
        console.log("Fehler in PATCH /api/courses/[courseId]/publish");
        return new NextResponse("Ein Fehler ist aufgetreten" , { status : 500})
    }
}