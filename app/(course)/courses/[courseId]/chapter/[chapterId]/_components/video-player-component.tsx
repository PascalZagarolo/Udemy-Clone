'use client';

import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, LockIcon } from "lucide-react";
import { useState } from "react";
import { set } from 'zod';

interface VideoPlayerProps {
    chapterId : string,
    title : string,
    nextChapterId? : string,
    playbackId : string,
    isLocked : boolean,
    completeOnEnd : boolean,
    courseId : string
}


const VideoPlayer: React.FC<VideoPlayerProps> = ({
    chapterId,
    title,
    nextChapterId,
    playbackId,
    isLocked,
    completeOnEnd,
    courseId
}) => {

    const [isReady, setIsReady] = useState(false);
    

    return ( 
        <div className="relative aspect-video">
            {!isLocked && !isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 flex-col gap-y-2 text-secondary">
                    <LockIcon className="h-8 w-8" />
                    <p className="text-sm">
                        Dieses Kapitel wird bei Kauf freigeschaltet.
                    </p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer 
                title={title}
                className={cn(
                    !isReady && "hidden"
                )}
                onCanPlay={() => setIsReady(true)}
                onEnded={() => {}}
                autoPlay
                playbackId={playbackId}
                />
            )}
        </div>
     );
}
 
export default VideoPlayer;


/* 

chapterId = {params.chapterId}
                    title = {chapter.title}
                    courseId = {params.courseId}
                    nextChapterId = {nextChapter?.id}
                    playbackId = {muxData?.playbackId}
                    isLocked = {isLocked}
                    completeOnEnd = {completeOnEnd}

*/