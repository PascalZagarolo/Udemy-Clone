import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs"
import { db } from '@/lib/db';
import Mux from "@mux/mux-node";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_SECRET_TOKEN!
)


export async function PATCH(
    req :Request,
    { params } : { params : { courseId : string , chapterId : string}}
) {
    try {

        const { userId } = auth();
        const values  = await req.json();

        if (!userId) {
            return new NextResponse("Nicht autorisiert : " , { status : 401})
        }

        if (!params.courseId || !params.chapterId) {
            return new NextResponse("Kein passender Kurs / Kein passendes Kurskapitel gefunden " , { status : 400})
        }

        const chapter = await db.chapter.update({
            where : {
                id  : params.chapterId,
                courseId : params.courseId
            }, data : {
                ...values 
                
            }
        });

        if(values.videoUrl) {

            const exisitingMuxData = await db.muxData.findFirst({
                where : {
                    chapterId : params.chapterId
                }
            });

            if(exisitingMuxData) {
                await Video.Assets.del(exisitingMuxData.assetId);
                await db.muxData.delete({
                    where : {
                        id : exisitingMuxData.id
                    }
                })
            }


            const asset = await Video.Assets.create({
                input : values.videoUrl,
                playback_policy : "public",
                test: false
            })

            await db.muxData.create({
                data : {
                    chapterId : params.chapterId,
                    assetId : asset.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })
        }

        return NextResponse.json(chapter)

    } catch (error) {
        console.log("Fehler in PATCH /api/courses/[courseId]/chapters/[chapterId]");
        return new NextResponse("Ein Fehler ist aufgetreten : ", { status : 500})
    }
}

export async function DELETE(
    req : Request,
    { params } : { params : { courseId : string, chapterId : string}}
) {
    try {

        const { userId } = auth();

        const chapter = await db.chapter.findUnique({
            where : {
                id : params.chapterId,
            }

        })

        if (!chapter) {
            return new NextResponse("Kein passendes Kapitel gefunden : " , { status : 404});
        }

        if(chapter.videoUrl) {
            const exisitingVideoData = await db.muxData.findFirst({
                where : {
                    chapterId : params.chapterId
                }
            })

            if (exisitingVideoData) {
                await Video.Assets.del(exisitingVideoData.assetId);
                await db.muxData.delete({
                    where : {
                        id : exisitingVideoData.id
                    }
                })
            }

        }

        const deletedChapter = await db.chapter.delete({
            where : {
                id : params.chapterId
            }
        })

        const publishedChapters = await db.chapter.findMany({
            where : {
                id : params.courseId,
                isPublished : true
            }
        })

        //atleast one published Chapter required.
        if(!publishedChapters.length) {
            await db.course.update({
                where : {
                    id : params.courseId
                }, data : {
                    isPublished : false
                }

            })
        }


        return NextResponse.json(chapter)

    } catch(error) {
        console.log("Fehler in DELETE /api/courses/[courseId]/chapters/[chapterId]");
        return new NextResponse("Etwas ist schief gelaufen" , { status : 500 })
    }
}