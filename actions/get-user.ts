import { auth } from "@clerk/nextjs"

export const getUser = () => {

    const { userId } = auth();

    return userId;
}