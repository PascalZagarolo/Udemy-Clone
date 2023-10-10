'use client';

import { Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImagePlusIcon, MinusSquareIcon, PencilLine, PlusIcon, PlusSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import  Image  from "next/image"
import FileUpload from "@/components/file-upload";



interface ImageFormProps {
    initialData : Course;
}

const formSchema = z.object({
    imageUrl : z.string().min(1, {
        message : "Beschreibung ist zu kurz"
    })
})

const ImageForm : React.FC<ImageFormProps> = ({
    initialData
}) => {
    

    const toggleEdit = () => {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        console.log(values);
        
        try {
            await axios.patch(`/api/courses/${initialData.id}` , values )
         
            toggleEdit();
            router.refresh()
        } catch {
            toast.error("Fehler beim Speichern")
        }
    }

    const resetImage = async () => {
        try { 

        await axios.patch(`/api/courses/${initialData.id}` , { imageUrl : ""})
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
                Vorschaubild deines Kurses
                <Button variant ="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>
                        Abbrechen
                        </>
                    )} 
                    
                    {!isEditing && !initialData.imageUrl && (
                        <>
                        <PlusSquareIcon  className="h-4 w-4 mr-2"/>
                        Bild hinzufügen
                        </>
                    )} {!isEditing && initialData.imageUrl && (
                        <>
                        <PencilLine  className="h-4 w-4 mr-2"/>
                        Bild ändern
                        </>
                    )}
                </Button>
            </div>

            
            {  !isEditing && (
                !initialData.imageUrl ? ( 
                    <div className="flex items-center justify-center h-55 bg-slate-200 rounded-md">
                        <ImagePlusIcon className="h-8 w-88 text-slate-500" />
                    </div>
                )
             : (
                <div className="relative aspect-video mt-2">
                    
                    <Image 
                    alt = "Upload"
                    fill
                    className="object-cover rounded-md"
                    src={initialData.imageUrl}
                    />

                </div>
            )
            )
            }
            <button onClick={resetImage} className="mr-auto">
                     <MinusSquareIcon className="w-4 h-4" />
                </button>
            {isEditing && (
                <div>
                    <FileUpload 
                    endpoint="courseImage"
                    onChange={(url) => {
                        if(url) {
                            onSubmit({ imageUrl : url})
                        }
                    }}
                    />
                    <div>
                        Um Bild-Verzerrungen zu vermeiden, empfehlen wir ein .jpg mit einem Seitenverhältnis von 16:9 hochzuladen.
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default ImageForm;