import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const { title } = await req.json();

        if (!userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401})
        }

        const course = await db.course.create({
            data : {
                userId,
                title,
            }
         });

        return NextResponse.json(course)


    } catch (error) {
        console.log("api/courses : ", error);
        return new NextResponse("Etwas ist schief gelaufen : ",  { status : 500})
    }
}

