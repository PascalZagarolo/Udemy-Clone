import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { courseId : string , chapterId : string, commentId : string}}
) {
    try {

        const { userId } = auth();

        const { content } = await req.json();

        const patchedComment = await db.comments.update({
            where : {
                id : params.commentId
            }, data : {
                content : content,
                isEdited : true
            }
        })

        return NextResponse.json(patchedComment);


    } catch(error) {
        console.log("Fehler in PATCH /api/courses/[courseId]/chapters/[chapterId]/comments/[commentId]/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}

export async function DELETE(
    req : Request,
    { params } : { params : { courseId : string , chapterId : string, commentId : string}}
) {
    try {

    const { userId } = auth();
    
    if(!userId){
        return new NextResponse("Nicht autorisiert" , { status : 401})
    }

    const comment = await db.comments.deleteMany({
        where : {
            id : params.commentId,
        }
    })

    return NextResponse.json(comment);
    

    } catch(error){
        console.log("Fehler in Comment/[commentId]/route.ts: DELETE");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}