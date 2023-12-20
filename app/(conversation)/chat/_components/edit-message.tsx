'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";

import { MessageSquareIcon, PencilIcon, PencilLine } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditMessage = () => {




    const onClick = () => {
        console.log("...")
    }

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

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <PencilIcon className="ml-2 h-4 w-4 hover:text-gray-900" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-start">
                            <MessageSquareIcon className="h-6 w-6 mr-2" />
                            <p className="text-black">Nachricht bearbeiten</p>
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Bearbeitete Nachrichten werden mit einem Hinweise versehen.
                        <Form {...form}>
                            <form>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </DialogDescription>
                    <DialogFooter>
                        <DialogTrigger>
                            <Button variant="ghost">
                                Abbrechen
                            </Button>
                            <Button className="bg-blue-800">
                                Änderungen speichern
                            </Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default EditMessage;