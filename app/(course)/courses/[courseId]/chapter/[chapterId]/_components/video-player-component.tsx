'use client';

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
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
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async () => {

        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, { isCompleted: true })
            }

        } catch {
            toast.error("Etwas ist schief gelaufen.")
        }

        if (!nextChapterId) {
            confetti.onOpen();
            toast.success("Kurs erfolgreich abgeschlossen")
        } else {
            toast.success("Kapitel erfolgreich abgeschlossen")
        }

        router.refresh();
        if (nextChapterId) {
            router.push(`/courses/${courseId}/chapter/${nextChapterId}`);
        }



    }
    

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
                        Dieses Kapitel wird erst nach dem Kauf freigeschaltet.
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
                onEnded={onEnd}
                autoPlay
                playbackId={playbackId}
                />
            )}
        </div>
     );
}
 
export default VideoPlayer;


