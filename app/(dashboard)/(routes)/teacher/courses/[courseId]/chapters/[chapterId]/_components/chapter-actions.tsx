'use client';

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionProps {
    disabled : boolean;
    courseId : string,
    chapterId : string,
    isPublished : boolean,
}





const ChapterAction: React.FC<ChapterActionProps> = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        try {

            axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`, { courseId : courseId, chapterId : chapterId})
            toast.success("Kapitel veröffentlicht");
            router.refresh();
        } catch {
            toast.error("Etwas ist beim öffentlich stellen schief gelaufen.")
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Kapitel gelöscht");
            router.push(`/teacher/courses/${courseId}`);
            router.refresh()
        } catch {
            toast.error("Etwas ist beim löschen schief gelaufen.")
        } finally {
            setIsLoading(false)
        }
    }


    return ( 
        <div className="flex items-center gap-x-2">
            <Button
            onClick={handleClick}
            disabled={disabled}
            variant="outline"
            size="sm">
                {isPublished ? "Privat stellen" : "Veröffentlichen"}
            </Button>
            <Button size="sm" disabled={isLoading}>
                <ConfirmModal
                onConfirm={onDelete}
                
                >
                    <Trash2 className="h-4 w-4"/>
                </ConfirmModal>
            </Button>
        </div>
     );
}
 
export default ChapterAction;