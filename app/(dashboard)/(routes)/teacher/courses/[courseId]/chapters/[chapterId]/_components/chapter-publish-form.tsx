'use client';

import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import axios from "axios";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface PublishButtonProps {
    initialData : Chapter;
    courseId : string;
    chapterId : string;
}



const PublishButton: React.FC<PublishButtonProps> = ({
    initialData,
    courseId,
    chapterId
}) => {
    const router = useRouter();

    const [disabled, setDisabled] = useState(false);

    

    const handleClick = async () => {

        
        try {
            setDisabled(true);
            axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
            router.refresh()
            toast.success("Kapitel veröffentlicht");
            
        } catch {
            toast.error("Etwas ist beim öffentlich stellen schief gelaufen.")
        } finally {
            setDisabled(false);
        }
    }

    return ( 

        <Button variant="ghost" onClick={handleClick} disabled={disabled}>
            Veröffentlichen
        </Button>

     );
}
 
export default PublishButton;