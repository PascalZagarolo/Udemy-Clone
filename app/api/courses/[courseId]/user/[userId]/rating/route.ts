import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
    req : Request,
    { params } : { params : { courseId : string, userId : string }}
) {
    try { 

        const rating = await req.json();

        
        

        const existingRating = await db.ratings.findUnique({
            where : {
                userId_courseId : {
                    userId : params.userId,
                    courseId : params.courseId
                
                }
            }
        })

        let createdRating;

        if(!existingRating){
            createdRating = await db.ratings.create({
                data : {
                    userId : params.userId,
                    courseId : params.courseId,
                    score : rating
                }
            })
        } else {
            createdRating = await db.ratings.update({
                where : {
                    userId_courseId : {
                        userId : params.userId,
                        courseId : params.courseId
                    }
                }, data : {
                    score : rating
                }
                
            })
        }

        

        return NextResponse.json(createdRating);

    } catch (error){
        console.log("Fehler in PATCH /courses/[courseId]/user/[userId]/rating/route.ts:");
        return new NextResponse("Interner Server Error ", { status : 500 })
    }
}