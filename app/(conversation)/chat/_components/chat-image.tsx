'use client'

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { url } from "inspector";
import { File, Image } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Url } from "url";
import { z } from "zod";

const ChatImage = () => {

    const formSchema = z.object({
        url: z.string().min(3, {
            message: "Bitte hänge eine Datei an"
        })
    })

    const params = useParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.post(`/api/user/${params.userId}/chat/message`, values);
        } catch {
            toast.error("Fehler beim schicken des Bildes...");
        } finally {
            setTimeout(() => {
                router.refresh();
            }, 2000)
            setIsLoading(false);
        } 
        
        console.log(values);
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url : ""
        }
    })

    const { isValid, isSubmitting } = form.formState;


    return (
        <Dialog>
            <DialogTrigger className="font-semibold">
                <Image />
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form>

                        <DialogHeader>
                            <DialogTitle className="flex justify-start items-center"> <File className="mr-2 text-blue-800" /> Hänge der Konversation eine Datei an</DialogTitle>
                            <DialogDescription>

                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="courseAttechment"
                                                    onChange={(url) => {
                                                        if (url) {
                                                            onSubmit({ url: url })
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogTrigger>
                                <Button className="bg-blue-800 hover:bg-blue-800/80 mt-2" type="submit" disabled={!isValid} >Nachricht absenden</Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default ChatImage;