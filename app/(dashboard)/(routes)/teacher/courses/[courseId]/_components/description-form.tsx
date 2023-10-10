'use client';

import { Course } from "@prisma/client";

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



interface DescriptionFormProps {
    initialData : Course;
}

const formSchema = z.object({
    description : z.string().min(1, {
        message : "Beschreibung ist zu kurz"
    })
})

const DescriptionForm : React.FC<DescriptionFormProps> = ({
    initialData
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
        
        console.log(values);
        
        try {
            await axios.patch(`/api/courses/${initialData.id}` , values)
            toast.success("Beschreibung hinzugefügt");
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
                Kursbeschreibung
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
                <p className={cn("text-sm mt-2",
                !initialData.description && "text-slate-500 italic")}>

                    {initialData.description || "Noch keine Beschreibung hinzugefügt"} 
                </p>
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
                                    <Textarea
                                    disabled={isSubmitting}
                                    placeholder="Beschreibung deines Kurses"
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
 
export default DescriptionForm;