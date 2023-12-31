'use client';


import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";





interface ChapterCommentInputProps {
    chapterId : string
    courseId : string
    
}


const ChapterCommentInput: React.FC<ChapterCommentInputProps> = ({
    chapterId,
    courseId
}) => {

    const formSchema = z.object({
        content: z.string().min(1, {
           message: "Kommentar ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            content : ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const router = useRouter();

    

    


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
            axios.post(`/api/courses/${courseId}/chapters/${chapterId}/comments`, values);
            router.refresh();
            toast.success("Kommentar erfolgreich hinzugefügt");
            
    
        } catch {
            toast.error("Etwas ist beim Kommentar hinzufügen schief gelaufen");
        } finally {
            form.reset();
            router.refresh();
        }
    }

    return (
        <div>
        <Form {...form}>
            <div className="text-xl font-semibold mt-8"> Fragen / Anregungen anderer Kursteilnehmer </div>
            <p className="text-sm text-gray-700/60 mt-2"> Kommentare sind für andere Nutzer öffentlich sichtbar </p>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField 
                        control = {form.control}
                        name="content"
                        render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea 
                                    placeholder="Deine Anmerkungen/Fragen zum Kapitel..."
                                    className="mt-8"
                                    {...field}
                                    />
                                    
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2 mt-4">
                            
                            <Button type="submit" disabled={!isValid || isSubmitting} className="bg-blue-800 hover:bg-blue-800/80 mt-4 mb-4" aria-controls="radix-:R2mqqrcq:" >
                                Kommentar abschicken.
                            </Button>
                        </div>
                        
                    </form>
                </Form>
                
                </div>
     );
}
 
export default ChapterCommentInput;