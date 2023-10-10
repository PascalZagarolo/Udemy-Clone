'use client';

import { Chapter, Course, MuxData } from "@prisma/client";
import MuxPlayer from "@mux/mux-player-react";
import * as z from "zod";
import axios from "axios";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImagePlusIcon, MinusSquareIcon, PencilLine, PlusIcon, PlusSquareIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import  Image  from "next/image"
import FileUpload from "@/components/file-upload";



interface ChapterVideoFormProps {
    initialData : Chapter & { muxData : MuxData | null};
    courseId : string,
    chapterId : string
}

const formSchema = z.object({
    videoUrl : z.string().min(1, {
        message : "Beschreibung ist zu kurz"
    })
})

const ChapterVideoForm : React.FC<ChapterVideoFormProps> = ({
    initialData,
    courseId,
    chapterId
}) => {
    

    const toggleEdit = () => {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        console.log(values);
        
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}` , values )
         
            toggleEdit();
            router.refresh()
        } catch {
            toast.error("Fehler beim Speichern")
        }
    }

    const resetVideo = async () => {
        try { 

        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}` , { videoUrl : ""})
        toast.success("Bild erfolgreich entfernt")
        router.refresh();
        }
        catch {
            toast.error("Fehler beim Entfernen");
        }
    }

    const [isEditing, setIsEditing] = useState(false);

    

    const router = useRouter();

    

    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Video deines Kapitels
                <Button variant ="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>
                        Abbrechen
                        </>
                    )} 
                    
                    {!isEditing && !initialData.videoUrl && (
                        <>
                        <PlusSquareIcon  className="h-4 w-4 mr-2"/>
                        Video hinzufügen
                        </>
                    )} {!isEditing && initialData.videoUrl && (
                        <>
                        <PencilLine  className="h-4 w-4 mr-2"/>
                        Video ändern
                        </>
                    )}
                </Button>
            </div>

            
            {  !isEditing && (
                !initialData.videoUrl ? ( 
                    <div className="flex items-center justify-center h-55 bg-slate-200 rounded-md">
                        <VideoIcon className="h-8 w-88 text-slate-500" />
                    </div>
                )
             : (
                <div className="relative aspect-video mt-2">
                    
                    <MuxPlayer 
                    playbackId={initialData?.muxData?.playbackId || ""}
                    
                    />

                </div>
            )
            )
            }
            <button onClick={resetVideo} className="mr-auto">
                     <MinusSquareIcon className="w-4 h-4" />
                </button>
            {isEditing && (
                <div>
                    <FileUpload 
                    endpoint="courseImage"
                    onChange={(url) => {
                        if(url) {
                            onSubmit({ videoUrl : url})
                        }
                    }}
                    />
                    <div>
                        Kapitel-Video auswählen oder reinziehen.
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Der Video-Upload kann etwas dauern. Bitte warte einen Moment, bis das Video verfügbar ist.
                </div>
            )}
        </div>
     );
}
 
export default ChapterVideoForm;