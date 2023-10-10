import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { icons } from 'lucide-react';
import { MuxData } from '@prisma/client';
import Mux from "@mux/mux-node";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_SECRET_TOKEN!
);

export async function PATCH(
    req : Request,
    { params } : { params : { courseId : string }}
) {
    try {
        
        
        const values = await req.json();

        const { userId } = await auth();
        

        if (!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }
        
        
        const course = await db.course.update({
            where : {
                id : params.courseId,
                userId
            } , 
            data : {
                ...values
            }
        })

       

        

        return NextResponse.json(course);


    } catch(error) {
        console.log("Fehler : /api/courses/[courseId] PATCH");
        return new NextResponse("Ein Fehler ist aufgetreten :  ", { status : 500 })
    }
}

export async function DELETE(
    req : Request,
    { params } : { params : { courseId : string}}
) {
     try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Nicht autorisiert : " , { status : 401})
        }

        const course = await db.course.findUnique({
            where : {
                id : params.courseId,
            }, include : {
                chapters : {
                    include : {
                        muxData : true
                    }
                }
            }
        })

        if(!course) {
            return new NextResponse("Kein gültiger Kurs wurde gefunden : " , { status : 404})
        }
        for (const chapter of course.chapters) {
            if(chapter.muxData?.assetId){
                await Video.Assets.del(chapter.muxData.assetId);
            }
        }
        

        const chapters = await db.chapter.findMany({
            where : {
                courseId : params.courseId
            }
        })

        if(chapters) {
            for(const chapter of chapters){
                const muxData = await db.muxData.findMany({
                    where : {
                        chapterId : chapter.id
                    }
                })

                if(muxData){
                    for(let j = 0 ; j < muxData.length; j++){

                        
                        await db.muxData.delete({
                            where : {
                                id : muxData[j].id
                            }
                        })

                   
                    }
                }
            }
        }

        for (const chapter of chapters) {
            await db.chapter.delete({
                where : {
                    id : chapter.id
                }
            })
        }

        await db.course.delete({
            where : {
                id : params.courseId
            }
        })


        return NextResponse.json({ course, chapters})
     } catch (error) {
        console.log("Fehler : /api/courses/[courseId] DELETE");
        return new NextResponse("Ein Fehler ist aufgetreten : ", { status : 500})
     }
}

export async function GET(
    req : Request,
    { params } : { params : { courseId : string}}
) {

    const course = await db.course.findUnique({
        where : {
            id : params.courseId
        }
    })

    return NextResponse.json(course);
}