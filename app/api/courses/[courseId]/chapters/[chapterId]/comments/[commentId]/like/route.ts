import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { comment } from 'postcss';
export async function PATCH(
    req : Request,
    { params } : { params : { courseId : string , chapterId : string, commentId : string}}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        const { isLike } = await req.json();

        

        const likeAmount = isLike ? 1 : -1;

        const likedComment = await db.comments.update({
            where : {
                id : params.commentId
            }, 
                data : {
                    likes : {
                        increment : likeAmount
                    }
            }
           
        })

        return NextResponse.json(likedComment);
    } catch(error) {
        console.log("Etwas ist schief gelaufen...");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}