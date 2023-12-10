import SideBar from "@/app/(dashboard)/_components/Sidebar"
import ChatSideBar from "./_components/chat-sidebar"
import UserHeader from "@/app/(profilepage)/user/[userId]/_components/user-header"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { db } from "@/lib/db"

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
            </div>
        </div>





    );
}

export default ChatMainPage;