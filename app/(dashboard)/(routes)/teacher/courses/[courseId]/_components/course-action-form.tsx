'use client';

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionProps {
    disabled : boolean;
    courseId : string,
    isPublished : boolean,
}





const CourseAction: React.FC<CourseActionProps> = ({
    disabled,
    courseId,
    isPublished
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();
    const handleClick = async () => {
        try {

            axios.patch(`/api/courses/${courseId}/publish`)
            if(isPublished) {
                toast.success("Kurs privat gestellt");
            } else {
                toast.success("Kurs veröffentlicht");
                confetti.onOpen();
            }
            router.refresh();
        } catch {
            toast.error("Etwas ist beim öffentlich stellen schief gelaufen.")
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/courses/${courseId}`)
            toast.success("Kurs wurde erfolgreich gelöscht");
            router.push(`/teacher/courses`);
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
 
export default CourseAction;