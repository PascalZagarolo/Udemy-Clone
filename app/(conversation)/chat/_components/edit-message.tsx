'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { MessageSquareIcon, PencilIcon, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


interface EditMessageProps {
    messageId: string
}
const EditMessage: React.FC<EditMessageProps> = ({
    messageId
}) => {

    const router = useRouter();

    const formSchema = z.object({
        content: z.string().min(1, {
            message: "Beschreibung ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            axios.patch(`/api/message/${messageId}`, values);
            toast.success("Nachricht bearbeitet");
            setTimeout(() => {
                router.refresh();
            }, 1500)
        } catch {
            toast.error("Etwas ist schief gelaufen :/");
        } finally {
            setIsLoading(false);
        }
    }

    const onClick = () => {
        console.log("dejifspkmdfo")
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <PencilIcon className="ml-2 h-4 w-4 hover:text-gray-900" />
                </DialogTrigger>
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle className="flex justify-start">
                                    <MessageSquareIcon className="h-6 w-6 mr-2" />
                                    <p className="text-black">Nachricht bearbeiten</p>
                                </DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <p className="mb-2"> Bearbeitete Nachrichten werden mit einem Hinweise versehen. </p>

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="w-full mt-4 mb-4"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </DialogDescription>
                            <DialogFooter>
                                <DialogTrigger>
                                    <Button variant="ghost">
                                        Abbrechen
                                    </Button>
                                </DialogTrigger>
                                <DialogTrigger>
                                    <Button className="bg-blue-800" disabled={isSubmitting || !isValid} type="submit">
                                        Änderungen speichern
                                    </Button>
                                </DialogTrigger>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default EditMessage;