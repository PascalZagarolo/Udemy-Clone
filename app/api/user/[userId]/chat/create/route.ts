import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { userId : string }}
) {
    try {
        const { userId } = auth();
        //!... Create a new chat...

    } catch(error) {
        console.log(error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}