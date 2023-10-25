import { Comments, User } from "@prisma/client";
import CommentHeader from "./chapter-comment-header";
import { getUserName } from "@/actions/get-username";
import CommentContent from "./chapter-comment-content";
import CommentBox from "./chapter-comment-box";



type CommentWithUserProfile = Comments & {
    user : User
  }

interface CommentHeaderProps {
    comments : CommentWithUserProfile[];
    courseId : string;
    chapterId : string
}




const CommentSection: React.FC<CommentHeaderProps> = async ({
    comments,
    courseId,
    chapterId,
}) => {

    const usernames: string[] = [];

    async function fetchUsernames() {
      for (const comment of comments) {
        const username: string = await getUserName(comment.userId);
        usernames.push(username);
      }
    }
    

    return ( 
        <div>
            <CommentHeader 
            comments={comments}
            courseId={courseId}
            chapterId={chapterId}
            usernameArray = {usernames}
            />
            <CommentBox 
            comments={comments}
            
            />
        </div>
     );
}
 
export default CommentSection;                                  