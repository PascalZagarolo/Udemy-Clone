import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req : Request,
    { params } : { params : { courseId : string}}
) {
    try {

        const { userId } = auth();
        const { list } = await req.json();

        if (!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        if (!params.courseId) {
            return new NextResponse("Kein passender Kurs wurde gefunden : " , { status : 404})
        }

        for (let item of list) {
            await db.chapter.update({
                where : { 
                    id : item.id 
                },
                data : {
                    position : item.position
                }
            })
        }

        return new NextResponse("Erfolgreich aktualisiert", { status : 200})
        
    } catch (error) {
        console.log("Ein Fehler ist aufgetreten : /api/courses/[courseId]/chapters/reorder/route.ts PUT");
        return new NextResponse("Etwas ist schief gelaufen : ", { status : 500 })
    }
}