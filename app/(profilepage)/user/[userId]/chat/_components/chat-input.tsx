'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const ChatInput = () => {

    const formSchema = z.object({
        content: z.string().min(1, {
            message: "Nachricht ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();

    const onSubmit = (values : z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.post(`/api/user/${params.userId}/message` , values);
            toast.success("Nachricht erfolgreich gesendet");
        } catch {
            toast.error("Nachricht konnte nicht gesendet werden");
        } finally {
            setIsLoading(false)
        }
     }

    const { isSubmitting, isValid } = form.formState

    return (
        <div className="w-full">
            <div className="flex justify-start">

                


                    <Form {...form}> 
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-start">
                            <Button variant="ghost" className="ml-4" type="submit" disabled={!isValid} onSubmit={form.handleSubmit(onSubmit)}>
                                <Send
                                    className="text-blue-800"
                                />
                            </Button>
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="ml-4">
                                            <Input
                                                placeholder="Verfasse eine Nachricht"
                                                {...field}
                                            />
                                            </div>
                                            
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </form>
                    </Form>


                
            </div>

        </div>
    );
}

export default ChatInput;