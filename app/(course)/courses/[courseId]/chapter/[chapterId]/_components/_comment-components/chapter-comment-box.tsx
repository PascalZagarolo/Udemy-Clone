'use client';
import { getCommentFilter } from "@/actions/change-comment-filter";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Comments, User } from "@prisma/client";
import { FlipVerticalIcon, MessageCircle, MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { comment } from "postcss";
import { Label } from "recharts";
import CommentContent from "./chapter-comment-content";
import { getUserName } from "@/actions/get-username";
import { getSearchParams } from "@/actions/get-searchparams";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type CommentWithUserProfile = Comments & {
    user: User
}

interface CommentBoxProps {
    comments: CommentWithUserProfile[];
}




const CommentBox: React.FC<CommentBoxProps> = ({
    comments

}) => {

    const searchParams = useSearchParams();
    const filterOption = searchParams.get("commentFilter");


    if (filterOption === "newest") {
        comments.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        })
    } else if (filterOption === "oldest") {
        comments.sort((a, b) => {
            return a.createdAt.getTime() - b.createdAt.getTime();
        })
    }

    const displayedComments = comments.length > 5 ? comments.slice(0, 5) : comments;

    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    const formattedDate = (date : Date) => {
        const newDate = (date).toLocaleDateString("de-DE");
        return newDate;
    }

    return (
        <div className="flex flex-col">
            <Dialog open={isOpen}
                onOpenChange={onClick}
                >
                <DialogContent className="h-full scroll-m-0 overflow-scroll">
                    <DialogHeader className="flex justify-between">
                        <MessageCircle className="h-6 w-6" />
                        <p className="mr-auto font-semibold text-xl">  Kommentare </p>
                        <div className="mt-4">
                        <Separator className="bg-gray-900 mt-4"/>
                        </div>
                    </DialogHeader>
                    {comments.length > 0 && (
                        comments.map((comment) => (
                            <div key={comment.id} className="overflow-y:scroll">
                                <div className="flex justify-between">
                                    <p className="font-semibold">{comment.user.username}</p>
                                    <p className="text-sm text-gray-700/80">{formattedDate(comment.createdAt)}</p>
                                </div>
                                <div className="mt-4 text-sm">
                                    {comment.content}
                                </div>
                            </div>
                        ))
                    )}
                    

                    <DialogFooter>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            {displayedComments.length > 0 && (
                displayedComments.map((comment) => (
                    <CommentContent
                        key={comment.id}
                        comment={comment}
                        username={comment.user.username}
                    />
                ))
            )}
            <Button className="w-full hover:underline" variant="ghost" aria-controls="radix-:R2mqqrcq:" onClick={onClick}>
                Alle Kommentare anzeigen
            </Button>

        </div>
    );
}

export default CommentBox;