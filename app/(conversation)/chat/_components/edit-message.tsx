'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";

import { MessageSquareIcon, PencilIcon, PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";

const EditMessage = () => {

    const form = useForm();


    const onClick = () => {
        console.log("...")
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <PencilIcon className="ml-2 h-4 w-4 hover:text-gray-900" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-start">
                            <MessageSquareIcon className="h-6 w-6 mr-2"/>
                        <p className="text-black">Nachricht bearbeiten</p>
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Bearbeitete Nachrichten werden mit einem Hinweise versehen.
                        <Form {...form}>
                            <form>
                                <Input className="mt-4 mb-2"
                                placeholder="Nachricht..."
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