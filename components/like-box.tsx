'use client';

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";

const LikeBox = () => {
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
        </div>
     );
}
 
export default LikeBox;