'use client';

import { Button } from "@/components/ui/button";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface PublishButtonProps {
    initialData : Course;
}



const PublishButton: React.FC<PublishButtonProps> = ({
    initialData
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const handleClick = async () => {
        try {
            console.log(initialData.id)
            setIsLoading(true);
            axios.patch(`/api/courses/${initialData.id}/publish`)
            toast.success("Kurs veröffentlicht");
            router.refresh();
        } catch {
            toast.error("Etwas ist beim öffentlich stellen schief gelaufen.")
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Button variant = "ghost" onClick={handleClick} disabled={isLoading}>
            Veröffentlichen
        </Button>
     );
}
 
export default PublishButton;