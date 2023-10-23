'use client';
import { getCommentFilter } from "@/actions/change-comment-filter";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Comments, User } from "@prisma/client";
import { FlipVerticalIcon, MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { comment } from "postcss";
import { Label } from "recharts";
import CommentContent from "./chapter-comment-content";
import { getUserName } from "@/actions/get-username";
import { getSearchParams } from "@/actions/get-searchparams";

type CommentWithUserProfile = Comments & {
    user : User
  }

interface CommentBoxProps {
    comments : CommentWithUserProfile[];
}




const CommentBox: React.FC<CommentBoxProps> = ({
    comments
    
}) => {

    const searchParams = useSearchParams();
    const filterOption = searchParams.get("commentFilter");
    

    if(filterOption === "newest") {
        comments.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        })
    } else if (filterOption === "oldest") {
        comments.sort((a, b) => {
            return a.createdAt.getTime() - b.createdAt.getTime();
        })
    }

    const displayedComments = comments.length > 5 ? comments.slice(0, 5) : comments;

    

    

    return (
        <div className="flex flex-col">
            {displayedComments.length > 0 && (
                displayedComments.map((comment)  => (
                        <CommentContent
                        key={comment.id} 
                        comment={comment}
                        username={comment.user.username}
                    />
                ))
            )} 
            <Button className="w-full hover:underline" variant="ghost" aria-controls="radix-:R2mqqrcq:">
                Alle Kommentare anzeigen
            </Button>

        </div>
    );
}

export default CommentBox;