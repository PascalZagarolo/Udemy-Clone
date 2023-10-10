import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { courseId : string}}
) {
    try {

        const values = await req.json();
        const { url } = values;
        const { userId } =  await auth();

        if(!userId ) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        if(!params.courseId) {
            return new NextResponse("Kein Kurs gefunden : ", { status : 404})
        }

        const courseOwner = await db.course.findUnique({
            where : {
                id : params.courseId,
                userId : userId
            }
        })


        const attachment = await db.attechment.create({
            data : {
                url,
                name : url.split("/").pop(),
                courseId : params.courseId
            }
        })

        return NextResponse.json(attachment)

    } catch (error){
        console.log("Fehler : /api/courses/[courseId] POST" ,  error);
        return new NextResponse("Ein Fehler ist aufgetreten : ", { status : 500})
    }
}