'use client';

import { Attachment, Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";


import { File, FileBoxIcon, FilePlus2, FileUp, ImagePlusIcon, Loader, Loader2, MinusSquareIcon, PencilLine, PlusIcon, PlusSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


import  Image  from "next/image"
import FileUpload from "@/components/file-upload";



interface AttechmentFormProps {
    initialData : Course & { attachments : Attachment[] }
}

const formSchema = z.object({
    url : z.string().min(1)
})

const AttechmentForm : React.FC<AttechmentFormProps> = ({
    initialData
}) => {
    

    const toggleEdit = () => {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        console.log(values);
        
        try {
            await axios.post(`/api/courses/${initialData.id}/attachments` , values )
         
            toggleEdit();
            router.refresh()
        } catch {
            toast.error("Fehler beim Speichern")
        }
    }

    const resetImage = async () => {
        try { 

        await axios.post(`/api/courses/${initialData.id}/attachments` , { url : ""})
        toast.success("Anhang erfolgreich entfernt")
        router.refresh();
        }
        catch {
            toast.error("Fehler beim Entfernen");
        }
    }

    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDelete] = useState<string | null>(null)

    const onDelete = async (id: string) => {
        try {
            setDelete(id)
            axios.delete(`/api/courses/${initialData.id}/attachments/${id}`)
        } catch{
            toast.error("Etwas ist beim löschen schief gelaufen")
        } finally {
            setDelete(null)
            toast.success("Anhang erfolgreich entfernt")
            router.refresh();
        }
    }
    

    const router = useRouter();

    

    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Lerninhalte anpassen.
                <Button variant ="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>
                        Abbrechen
                        </>
                    )} 
                    
                    {!isEditing && (
                        <>
                        <FileUp  className="h-4 w-4 mr-2"/>
                         Datei/-en anhängen
                        </>
                    )} 
                </Button>
            </div>

            
            {!isEditing && (
                <>
                {initialData.attachments.length === 0 && (
                    <p className="text-sm mt-2 text-slate-500 italic">
                        Noch keine Anhänge hinzugefügt.
                    </p>
                )}
                {initialData.attachments.length > 0 && (
                    <div className="space-y-2">
                        {initialData.attachments.map((attachment) => (
                            <div key={attachment.id}
                            className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                                <FileBoxIcon className="h-4 w-4 mr-2 flex-shrink-0"/>
                                <p className="text-xs line-clamp-1">
                                    {attachment.name}
                                </p>
                                {deletingId === attachment.id && (
                                    <div>
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                    </div>
                                )}
                                {deletingId !== attachment.id && (
                                    <button className="ml-auto hover:opacity-75 transition" >
                                        <MinusSquareIcon className ="w-4 h-4" onClick={async() => {await onDelete(attachment.id)}} />
                                    </button>
                                )}
                            </div>
                        ))}
                       
                    </div>
                )}
                </>
            )
            }
            
            {isEditing && (
                <div>
                    <FileUpload 
                    endpoint="courseAttechment"
                    onChange={(url) => {
                        if(url) {
                            onSubmit({ url : url})
                        }
                    }}
                    />
                    <div>
                        Wir empfehlen Video- und Bildinhalte im 16:9 Format hochzuladen um mögliche Verzerrungen zu vermeiden.
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default AttechmentForm;