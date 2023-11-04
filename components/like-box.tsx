'use client';

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Comments } from "@prisma/client";


interface LikeBoxProps {
    comments : Comments;
}

const LikeBox: React.FC<LikeBoxProps> = ({
    comments
}) => {

    if(comments.likes === null) {
        comments.likes = 0;
    }
    return ( 
        <div className="flex justify-between">
            
            <div>
            <button>
                <ThumbsUp className="h-4 w-4 text-blue-800"/>
                </button>
            </div>
            <div className="mr-auto ml-4 ">
                <button>
                <ThumbsDown className="h-4 w-4"/>
                </button>
                
            </div>
            <div className="justify-between items-center mr-[820px] mb-[2px] text-sm text-gray-800/80">
                {comments.likes}
            </div>
        </div>
     );
}
 
export default LikeBox;