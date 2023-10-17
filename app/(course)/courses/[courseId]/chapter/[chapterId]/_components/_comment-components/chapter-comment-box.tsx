import { auth } from "@clerk/nextjs";
import { Comments } from "@prisma/client";
import { comment } from "postcss";

interface CommentBoxProps {
    comment : Comments
}


const CommentBox: React.FC<CommentBoxProps> = async ({
    comment
}) => {

    

    return ( 
        <div className="w-full ">
            <div className="font-semibold">
                {comment.userId}: 
                
            </div>
            <div key={comment.id}>
                {comment.content}
            </div>
        </div>
     );
}
 
export default CommentBox;