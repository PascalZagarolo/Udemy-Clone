'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import Logo from "./Logo"
import { Contact2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog";


interface InitializeProfileBoxProps {
    isOpen: boolean
}

const InitializeProfileBox: React.FC<InitializeProfileBoxProps> = ({
    isOpen
}) => {

    const [isLoading, setIsLoading] = useState(false)
    
    const formschema = z.object({
        name: z.string().min(1, {
            message: "Name ist zu kurz"
        }).max(30),
        username: z.string().min(1, {
            message: "Benutzername ist zu kurz"
        }).max(30),
        
    })

    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {
            name: "",
            username: ""
        }
    })

    const { isSubmitting, isValid } = form.formState;
    
    const router = useRouter();

    const onSubmit =  (values : z.infer<typeof formschema>) => {
        try {
            setIsLoading(true);
            axios.post("/api/profile", values)
            toast.success("Nutzer erfolgreich erstellt");
            router.refresh();

        } catch {
            toast.error("Fehler beim Erstellen des Nutzers");
        } finally {
            setIsLoading(false)
            isOpen = false;
        }
    }

    return (
        <Dialog open={isOpen} aria-controls="radix-:R1mcq:">
            <DialogContent aria-controls="radix-:R1mcq:">
                <DialogHeader>
                    <div className="mb-10">
                        <Logo/>
                    </div>
                    <DialogTitle className="flex flex-col mb-3" aria-controls="radix-:R1mcq:">
                        <Contact2 className="mb-3" />
                        Profil erstellen
                    </DialogTitle>
                    <DialogDescription className="mt-3" aria-controls="radix-:R1mcq:">
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
                                                {...field}
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
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="flex items-center gap-x-2">
                                <DialogTrigger>
                                <Button type="submit" className="bg-blue-800 mt-4 bottom-0" aria-controls="radix-:R1mcq:" disabled={!isValid || isSubmitting}>
                                    Nutzer erstellen.
                                </Button>
                                </DialogTrigger>
                            </div>
                        </form>
                        </Form>
                  
            </DialogContent>
        </Dialog>

    );


}

export default InitializeProfileBox;