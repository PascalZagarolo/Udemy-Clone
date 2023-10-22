import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Comments } from "@prisma/client";
import { MoreVerticalIcon } from "lucide-react";

interface CommentContentProps {
    comment : Comments;
}

const formattedDate =  (date : Date) => {

    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("de-DE");
}

const CommentContent: React.FC<CommentContentProps> = async ({
    comment
}) => {
    
    const getUsername = async (userId : string) => {
        const username = await db.user.findUnique({
            where : {
                id : userId
            }
        })

        return username?.username;
        
    }

    return (
        <div key={comment.id}>
            <div className="mt-4 text-medium text-semibold text-gray-900 hover:text-gray-900/80 font-semibold" >
                <p>{await getUsername(comment.userId)}</p>
            </div>
            <div className="text-sm text-gray-800/80">
                <p>{formattedDate(comment.createdAt)}</p>
            </div>
            <div className="text-sm text-semibold flex items-center  justify-between">
                {comment.content}
                <div className="ml-auto">
                    <Button variant="ghost">
                        <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CommentContent;