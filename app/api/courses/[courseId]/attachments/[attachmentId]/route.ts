import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params } : { params : { attachmentId : string, courseId : string}}
) {
    try {
        
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Nicht autorisiert", { status : 401})
        }

        if(!params.courseId) {
            return new NextResponse("Kein Kurs gefunden : ", { status : 404})
        }

        if(!params.attachmentId) {
            return new NextResponse("Keinen passenden Anhang gefunden : ", { status : 404})
        }

        const attachment = await db.attachment.delete({
            where : {
                id : params.attachmentId,
                courseId : params.courseId
            }
        })

        return NextResponse.json(attachment);
        

    } catch(error) {
        console.log("Fehler : /api/courses/[courseId]/attachments/[attachmentId] DELETE")
        return new NextResponse("Etwas ist schief gelaufen" , { status : 500})
    }
}