
'use client';

import { getCommentFilter } from "@/actions/change-comment-filter";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Comments } from "@prisma/client";
import { FlipVerticalIcon, MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { comment } from "postcss";
import { Label } from "recharts";

interface CommentBoxProps {
    commentArray: Comments[]
    commentFilter : string;
}




const CommentBox: React.FC<CommentBoxProps> =  ({
    commentArray,
    commentFilter
}) => {

    

    const searchParams = useSearchParams();
    const filterOption = searchParams.get("commentFilter");

    if(filterOption === "newest") {
        commentArray.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
    } else if (filterOption === "oldest") {
        commentArray.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        })
    }

    const displayedComments = commentArray.length > 5 ? commentArray.slice(0, 5) : commentArray;

    const formattedDate =  (date : Date) => {

        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString("de-DE");
    }


    return (
        <div className="flex flex-col">
            {displayedComments.length > 0 && (
                displayedComments.map((comment) => (
                    <div key={comment.id}>
                        <div className="mt-4 text-medium text-semibold text-gray-900 hover:text-gray-900/80 font-semibold" >
                            <p>{comment.userId}</p>
                        </div>
                        <div className="text-sm text-gray-800/80">
                            <p>{formattedDate(comment.createdAt)}</p>
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
            <Button className="w-full hover:underline" variant="ghost" aria-controls="radix-:R2mqqrcq:">
                Alle Kommentare anzeigen
            </Button>

        </div>
    );
}

export default CommentBox;