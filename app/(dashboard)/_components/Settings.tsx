'use client';

import { getUserProfile } from "@/actions/get-userprofile";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Contact2Icon, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, FormProvider, set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";


interface SettingsProps {
    icon: LucideIcon
    label: string;
    name: string;
    username: string


}

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

const Settings: React.FC<SettingsProps> = ({
    icon: Icon,
    label,
    name,
    username
}) => {



    const pathname = usePathname();

    const onClick = () => {
        console.log("GEKLICKT!!!")
    }


    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Name ist zu kurz"
        }), username: z.string().min(1, {
            message: "Benutzername ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            username: username || "",
        }
    })

    const methods = useForm();

    const { isSubmitting, isValid } = form.formState;


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        toast.success("Profil erfolgreich bearbeitet")
    }


    return (
        <div className="grid grid-cols-2 gap-2">

            <Sheet>
                <SheetTrigger asChild aria-controls="radix-:Rl6rcq:">
                    <button
                        type="button"
                        onClick={onClick}
                        className={cn(`
                        flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20`
                        )} >
                        <div className="flex items-center gap-x-2 py-4">
                            <Icon
                                size={23}
                                className={cn(`text-slate-500`,)} />

                            {label}
                        </div>
                        <div className={cn(`ml-auto opacity-0 border-2 border-sky-700 h-full transition-all`,)} />
                    </button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <Contact2Icon />
                        <SheetTitle>Profil bearbeiten</SheetTitle>
                        <SheetDescription>
                            Ändere deinen Namen und deinen Benutzernamen. Änderungen sind für andere Sichtbar.
                        </SheetDescription>
                    </SheetHeader>
                    <FormProvider {...methods}>
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
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit" className="bg-blue-900 hover:bg-blue-900/80 mt-4" aria-controls="radix-:Rl6rcq:"
                                        disabled={!isValid || isSubmitting}>
                                        Änderungen speichern.
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </FormProvider>

                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Settings;