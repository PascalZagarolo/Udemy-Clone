
import { getCommentFilter } from "@/actions/change-comment-filter";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Comments } from "@prisma/client";
import { FlipVerticalIcon, MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import { comment } from "postcss";
import { Label } from "recharts";

interface CommentBoxProps {
    commentArray: Comments[]
}




const CommentBox: React.FC<CommentBoxProps> = async ({
    commentArray
}) => {

    let filter = getCommentFilter();

    let i, j;

    if(filter === "newest") {
        i = commentArray.length - 1;
        j = commentArray.length - 6;
    } else if (filter === "oldest") {
        i = 5;
        j = 0;
    }

    const displayedComments = commentArray.length > 5 ? commentArray.slice(j, i) : commentArray;

    const getUserName = async (userId: string) => {
        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })
        return user?.name || "Unbekannter Nutzer";


    }


    return (
        <div className="flex flex-col">
            {displayedComments.length > 0 && (
                displayedComments.map((comment) => (
                    <div key={comment.id}>
                        <div className="mt-4 text-medium text-semibold text-gray-900 hover:text-gray-900/80 font-semibold" >
                            <p>{comment.userId}</p>
                        </div>
                        <div className="text-sm text-semibold flex items-center  justify-between">
                            {comment.content}
                            <div className="ml-auto">
                            <Button variant="ghost">
                            <MoreVerticalIcon  className="h-4 w-4"/>
                            </Button>
                        </div>
                        </div>
                    </div>
                ))

            )}
            <Button className="w-full hover:underline" variant="ghost">
                Alle Kommentare anzeigen
            </Button>

        </div>
    );
}

export default CommentBox;