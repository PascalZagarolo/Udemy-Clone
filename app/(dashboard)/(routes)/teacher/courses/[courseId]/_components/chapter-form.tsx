'use client';

import { Chapter, Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilLine, PlusSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import ChaptersList from "./chapter-list";



interface ChapterFormProps {
    initialData : Course  & { chapters : Chapter[] }
}

const formSchema = z.object({
    title : z.string().min(1, {
        message : "Titel des Kapitels ist zu kurz"
    })
})

const ChapterForm : React.FC<ChapterFormProps> = ({
    initialData
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title : ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const toggleCreating = () => {
        isCreating ? setIsCreating(false) : setIsCreating(true);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        console.log(values);
        
        try {
            await axios.post(`/api/courses/${initialData.id}/chapters` , values)
            toast.success("Kapitel erstellt.");
            toggleCreating();
            router.refresh()
        } catch {
            toast.error("Fehler beim Speichern")
        }
    }

    const onReorder = async (updateData : {id : string, position : number}[]) => {
        try {
            setIsUpdating(true);
            axios.put(`/api/courses/${initialData.id}/chapters/reorder`, { list : updateData});
            toast.success("Kapitel-Reihenfolge aktuellisiert")

        } catch {
            toast.error("Etwas ist schiefgelaufen")
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id : string) => {
        router.push(`/teacher/courses/${initialData.id}/chapters/${id}`	)
    }

    const [isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false);
    

    const router = useRouter();

    

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
                    <LoaderIcon className="animate-spin h-6 w-6 text-sky-600"/>
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Kapitel deines Kurses
                <Button variant ="ghost" onClick={toggleCreating}>
                    {isCreating ? (
                        <>
                        Abbrechen
                        </>
                    ) : (
                        <>
                        <PlusSquareIcon  className="h-4 w-4 mr-2"/>
                            Füge ein Kapitel hinzu
                        </>
                    )}
                    
                </Button>
                
            </div>
            
            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                        control = {form.control}
                        name="title"
                        render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                    disabled={isSubmitting}
                                    placeholder="Wie soll dein Lernabschnitt heißen?"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Erstellen.
                            </Button>
                     
                    </form>
                </Form>
            )}

            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic" 
                )}>
                    {!initialData.chapters.length && "Noch keine Kapitel hinzugefügt"}
                    <ChaptersList 
                    onEdit = {onEdit}
                    onReorder ={onReorder}
                    items = {initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Ziehe Kapitel, um die Reihenfolge zu ändern.
                </p>
            )}
        </div>
     );
}
 
export default ChapterForm;