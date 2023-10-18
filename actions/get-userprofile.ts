import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import axios from "axios"

export const getUserProfile = async (): Promise<any> => {
    
    const { userId } = auth();

    if(!userId) {
        return null;
    }

    const userProfile = await db.user.findUnique({
        where : {
            id : userId
        }
    })

    if(!userProfile || !userProfile.name || !userProfile.username) {
        return null;
    }

    const name = userProfile.name;
    const username = userProfile.username;

    return { name, username }
}