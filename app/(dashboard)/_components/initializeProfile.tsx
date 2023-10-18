'use client';

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact2, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Logo from "./Logo";


interface initializeProfileBoxProps {
    isOpen: boolean
}

const initializeProfileBox: React.FC<initializeProfileBoxProps> = ({
    isOpen
}) => {

    const [isDisabled, setIsDisabled] = useState(false);

    const formschema = z.object({
        name: z.string().min(1, {
            message: "Name ist zu kurz"
        }).max(30),
        username: z.string().min(1, {
            message: "Benutzername ist zu kurz"
        }).max(30)
    })

    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {
            name: "",
            username: ""
        }
    })

    const onSubmit = () => {

    }



    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <div className="mb-10">
                        <Logo/>
                    </div>
                    <DialogTitle className="flex flex-col">
                        <Contact2 className="mb-3" />
                        Profil erstellen
                    </DialogTitle>
                    <DialogDescription>
                        Erstelle dein Profil, um mit dem Lernen zu beginnen. Dein Name sowie Benutzername sind für andere Nutzer sichtbar.
                    </DialogDescription>
                </DialogHeader>
                    <Label>
                        Name
                    </Label>
                    <Separator className="bg-slate-800 w-[30px] text-bold" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="mt-4 mb-6">
                                        <FormControl>
                                            <Input
                                                placeholder="gebe deinen Namen ein..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Label >
                                Benutzername
                            </Label>
                            <Separator className="bg-slate-800 w-[45px] mt-3 text-bold" />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="mt-8">
                                        <FormControl>
                                            <Input
                                                placeholder="gebe deinen Nutzernamen ein..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button type="submit" className="bg-blue-800 mt-4 bottom-0">
                                    Nutzer erstellen.
                                </Button>
                            </div>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>

    );


}

export default initializeProfileBox;