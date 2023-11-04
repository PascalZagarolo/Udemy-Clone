'use client';

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Comments } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";


interface LikeBoxProps {
    comments : Comments;
}

const LikeBox: React.FC<LikeBoxProps> = ({
    comments
}) => {

    const params = useParams();

    const router = useRouter();
    
    const test = () => {
        console.log("dfoijsdf")
    }

    const onClick = () => {
        try {
            axios.patch(`/api/courses/${params.courseId}/chapters/${params.chapterId}/comments/${comments.id}/like`, { isLike : true });
            
        } catch{
            console.log("error like...")
        } finally{
            router.refresh();
        }
        
    }

    if(comments.likes === null) {
        comments.likes = 0;
    }
    return ( 
        <div className="flex justify-between">
            
            
            <button onClick={onClick}>
                <ThumbsUp className="h-4 w-4 text-blue-800"/>
            </button>
            
            <div className="mr-auto ml-4 ">
                <button>
                <ThumbsDown className="h-4 w-4"/>
                </button>
                
            </div>
            <div className="justify-between items-center mr-[770px] mb-[2px] text-sm text-blue-800/80 font-semibold ml-4">
                {comments.likes} Likes
            </div>
        </div>
     );
}
 
export default LikeBox;