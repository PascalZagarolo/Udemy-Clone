'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChatInput = () => {

    const formSchema = z.object({
        message: z.string().min(1, {
            message: "Nachricht ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    return (
        <div className="w-full">
            <div className="flex justify-start">

                


                    <Form {...form}>
                        <form onSubmit={() => { }}>
                            <Button variant="ghost" className="ml-4" type="submit" disabled={!isValid || isSubmitting}>
                                <Send
                                    className="text-blue-800"
                                />
                            </Button>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="ml-4">
                                            <Input
                                                placeholder="Verfasse eine Nachricht"
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