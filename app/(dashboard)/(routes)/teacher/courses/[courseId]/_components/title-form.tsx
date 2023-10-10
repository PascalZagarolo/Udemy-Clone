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



interface TitleFormProps {
    initialData : Course;
}

const formSchema = z.object({
    title : z.string().min(1, {
        message : "Titel ist zu kurz"
    })
})

const TitleForm: React.FC<TitleFormProps> = ({
    initialData
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title : initialData.title
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
            toast.success("Neuer Titel gespeichert");
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
                Titel deines Kurses
                <Button variant ="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>
                        Abbrechen
                        </>
                    ) : (
                        <>
                        <PencilLine  className="h-4 w-4 mr-2"/>
                            Titel ändern
                        </>
                    )}
                    
                </Button>
                
            </div>
            {!isEditing && (
                <p className="text-sm mt-2 font-semibold">
                    {initialData.title} 
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                        control = {form.control}
                        name="title"
                        render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting}
                                    placeholder="Titel deines Kurses"
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
 
export default TitleForm;