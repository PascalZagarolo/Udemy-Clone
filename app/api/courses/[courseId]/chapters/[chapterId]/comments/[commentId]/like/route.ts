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

        const alreadyLiked = await db.likes.findFirst({
            where : {
                userId : userId,
                commentId : params.commentId
            }
        })

        const likeAmount = isLike ? 1 : -1;

        if (!alreadyLiked) {
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

            const setLikeComment = await db.likes.create({
                data : {
                    userId : userId,
                    commentId : params.commentId
                }
            })

            return NextResponse.json({likedComment, setLikeComment});
        } else  {
            const likedComment = await db.comments.update({
                where : {
                    id : params.commentId
                }, 
                    data : {
                        likes : {
                            increment : -1
                        }
                }
               
            })

            const setLikeComment = await db.likes.delete({
                where : {
                    userId_commentId : {
                        userId,
                        commentId : params.commentId
                    }
                }
            })

            return NextResponse.json({likedComment, setLikeComment});
        }

        

        

        

        
    } catch(error) {
        console.log("Etwas ist schief gelaufen...");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}