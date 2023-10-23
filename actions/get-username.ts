import { db } from '@/lib/db';
import { useConfettiStore } from '../hooks/use-confetti-store';
export const getUserName = async (userId : string) : Promise<any> => {

    const user = await db.user.findUnique({
        where : {
            id : userId
        }
    })

    return user?.username || "NAMEEE";

}