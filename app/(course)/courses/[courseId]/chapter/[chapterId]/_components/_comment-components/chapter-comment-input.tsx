'use client';


import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
            axios.post(`/api/courses/${courseId}/chapters/${chapterId}/comments`, values)
            toast.success("Kommentar erfolgreich hinzugefügt");
    
        } catch {
            toast.error("Etwas ist beim Kommentar hinzufügen schief gelaufen");
        }
    }

    return ( 
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                        control = {form.control}
                        name="content"
                        render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    placeholder="Deine Anmerkungen/Fragen zum Kapitel."
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={!isValid || isSubmitting} >
                                Änderungen speichern
                            </Button>
                        </div>
                    </form>
                </Form>
     );
}
 
export default ChapterCommentInput;