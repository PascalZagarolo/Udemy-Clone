'use client'

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { File, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { Url } from "url";
import { z } from "zod";

const ChatImage = () => {

    const formSchema = z.object({
        url: z.string().min(3, {
            message : "Bitte hänge eine Datei an"
        })
    })

    const onSubmit = (values : z.infer<typeof formSchema>) => {
        console.log(values);
    }

    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: ""
        }
    })
     
    const { isValid , isSubmitting } = form.formState;
    

    return ( 
        <Dialog>
            <DialogTrigger className="font-semibold">
                <Image/>
                </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form>
                <DialogHeader>
                    <DialogTitle className="flex justify-start items-center"> <File className="mr-2 text-blue-800"/> Hänge der Konversation eine Datei an</DialogTitle>
                    <DialogDescription>
                    <FileUpload
                            endpoint="courseAttechment"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ url: url })
                                }
                            }}
                        />
                        
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogTrigger>
                    <Button className="bg-blue-800 hover:bg-blue-800/80" type="submit" disabled={!isValid} >Nachricht absenden</Button>
                    </DialogTrigger>
                </DialogFooter>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default ChatImage;