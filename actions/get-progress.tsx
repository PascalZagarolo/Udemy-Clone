import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const getProgress = async  (
    userId : string,
    chapterId : string
): Promise<any> => {
    try {

        const progress = await db.userProgress.findUnique({
            where : {
                id : userId,
                chapterId : chapterId,
            }
        })


    } catch (error) {
        console.log("Fehler beim Abrufen des Fortschritts");
        return new NextResponse("Etwas ist schief gelaufen, " , { status : 500})
    }
}