
import UserHeader from "@/app/(profilepage)/user/[userId]/_components/user-header"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { SpeakerIcon, UserSquare2 } from "lucide-react"

const ChatMainPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const ownUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    return (
        <div className="md:pl-52" >
            <div className="md:pl-56 w-full h-[80px]">
                <UserHeader
                    user={ownUser!}
                    imageUrl={ownUser?.imageUrl || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                    isOwnSite={true}
                />
                <main className="ml-8 flex justify-center items-center ">
                <h3 className="items-center font-semibold text-2xl mt-8 justify-center">
                    Verfolge bereits gestartete Konversationen.
                    
                </h3>
                
            </main>
            <div className="flex justify-center items-center mt-2">
            <UserSquare2 className="h-8 w-8"/>
            </div>
            
            </div>
            
        </div>





    );
}

export default ChatMainPage;