'use client';

import { Chapter, Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea"; 
import Editor from "@/components/editor";

import { Checkbox } from "@/components/ui/checkbox";



interface ChapterAccessFormProps {
    initialData : Chapter;
    courseId : string,
    chapterId : string
}

const formSchema = z.object({
    isFree : z.boolean().default(false)
})

const ChapterAccessForm : React.FC<ChapterAccessFormProps> = ({
    initialData,
    courseId,
    chapterId
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            isFree : !!initialData.isFree
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
                Sichtbarkeit deines Kapitels
                <Button variant ="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>
                        Abbrechen
                        </>
                    ) : (
                        <>
                        <PencilLine  className="h-4 w-4 mr-2"/>
                            Sichtbarkeit bearbeiten
                        </>
                    )}
                    
                </Button>
                
            </div>
            {!isEditing && (
                <div className={cn("text-sm mt-2",
                !initialData.isFree && "text-slate-500 italic")}>

                    {initialData.isFree ? (
                        <>
                        Kapitel ist gratis
                        </>
                    ) : (
                        <>
                        Kapitel ist nicht gratis
                        </>
                    
                    )}
                    
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                        control = {form.control}
                        name="isFree"
                        render = {({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormDescription>
                                        Kapitel ist gratis zur Vorschau
                                    </FormDescription>
                                </div>
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
 
export default ChapterAccessForm;