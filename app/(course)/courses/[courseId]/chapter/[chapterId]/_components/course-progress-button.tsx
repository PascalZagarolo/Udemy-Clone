'use client';

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { after } from "node:test";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
    chapterId : string,
    courseId : string,
    nextChapter? : string,
    isCompleted : boolean,

}




const CourseProgressButton: React.FC<CourseProgressButtonProps> = ({
    chapterId,
    courseId,
    nextChapter,
    isCompleted
}) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, { isCompleted : !isCompleted});
            isCompleted ? toast.success("Fortschritt entfernt") : toast.success("Kapitel abgeschlossen")
            router.refresh()
            
                if(!nextChapter && !isCompleted) {
                    confetti.onOpen();
                    toast.success("Kurs erfolgreich abgeschlossen")
                } else if(isCompleted){
                    router.push(`/courses/${courseId}/chapter/${chapterId}`)
                }
                else if (nextChapter) {
                    router.push(`/courses/${courseId}/chapter/${nextChapter}`)
                }
    
        }  catch {
            toast.error("Etwas ist schief gelaufen.")
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            },3000)
        }
    }


    const Icon = isCompleted ? XCircle : CheckCircle;
    return ( 
        <Button type="button"
        variant = {isCompleted ? "outline" : "success"}
        onClick={onClick}
        disabled={isLoading}
        >
            {isCompleted ? "Kapitel-Fortschritt entfernen" : "Kapitel abschließen"}
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
     );
}
 
export default CourseProgressButton;