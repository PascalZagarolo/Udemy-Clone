import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";


export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Nicht autorisiert", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Interner Server Error", { status: 500 });
  }
}