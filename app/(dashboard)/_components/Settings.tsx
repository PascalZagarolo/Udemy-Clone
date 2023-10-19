'use client';

import { getUserProfile } from "@/actions/get-userprofile";
import { Button } from "@/components/ui/button";
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
import { set, useForm } from "react-hook-form";
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

    const [isLoadingData, setIsLoadingData] = useState(false);

    const pathname = usePathname();

    const onClick = () => {
        //?
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





    return (
        <div className="grid grid-cols-2 gap-2">

            <Sheet aria-controls="radix-:R1mcq:">
                <SheetTrigger asChild disabled={isLoadingData} aria-controls="radix-:R1mcq:">
                    <button
                        type="button"
                        onClick={onClick}
                        className={cn(`
                        flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20`
                        )} >
                        <div className="flex items-center gap-x-2 py-4">
                            <Icon
                                size={22}
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
                    <div className="grid gap-4 py-4 mt-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Name
                            </Label>
                            <Input id="name" value={name} className="col-span-3 ml-4" />
                        </div>
                        <Separator className="bg-slate-800 w-[45px] mt-3 text-bold" />
                        <div className="grid grid-cols-4 items-center gap-4 mt-4">
                            <Label htmlFor="username" className="text-left text-sm">
                                Nutzername
                            </Label>
                            <Input id="username" value={username} className="col-span-3 ml-4" />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="bg-blue-900 hover:bg-blue-900/80 mt-4" aria-controls="radix-:R1mcq:">Änderungen speichern.</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Settings;