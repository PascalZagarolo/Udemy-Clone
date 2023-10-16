'use client';

import { Chapter, Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/editor";
import { Preview } from "@/components/preview";




interface ChapterDescriptionFormProps {
    initialData : Chapter;
    courseId : string,
    chapterId : string
}

const formSchema = z.object({
    description : z.string().min(1, {
        message : "Beschreibung ist zu kurz"
    })
})

const ChapterDescriptionForm : React.FC<ChapterDescriptionFormProps> = ({
    initialData,
    courseId,
    chapterId
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            description : initialData.description || ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const toggleEdit = () => {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        console.log(courseId, chapterId);
        
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}` , values)
            toast.success("Kapitel aktualisiert");
            toggleEdit();
            router.refresh()
        } catch {
            toast.error("Fehler beim Speichern")
        }
    }

    const [isEditing, setIsEditing] = useState(false);

    

    const router = useRouter();

    

    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Kapitelbeschreibung
                <Button variant ="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>
                        Abbrechen
                        </>
                    ) : (
                        <>
                        <PencilLine  className="h-4 w-4 mr-2"/>
                            Beschreibung hinzufügen/ändern
                        </>
                    )}
                    
                </Button>
                
            </div>
            {!isEditing && (
                <div className={cn("text-sm mt-2",
                !initialData.description && "text-slate-500 italic")}>

                    {!initialData.description && "Keine Beschreibung"} 
                    {initialData.description && (
                        <Preview
                        value={initialData.description}
                        
                        />
                    )}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                        control = {form.control}
                        name="description"
                        render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Editor
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Änderungen speichern
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
     );
}
 
export default ChapterDescriptionForm;