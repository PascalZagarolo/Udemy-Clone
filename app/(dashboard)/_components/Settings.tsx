'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";


interface SettingsProps {

    icon: LucideIcon
    label: string;

}

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

const Settings: React.FC<SettingsProps> = ({

    icon: Icon,
    label
}) => {

    
    let name;
    let username;

    const [isLoadingData, setIsLoadingData] = useState(false);

    

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/profile`);
                console.log(response.data)
                username = response.data.username;
                name = response.data.name;
                
            } catch {
                toast.error("Fehler beim Laden des Nutzers")
            } 
        }
        
    })

    const onClick = () => {
        
    }

    

    const pathname = usePathname();
    

    const formSchema = z.object({
      name: z.string().min(1, {
         message: "Name ist zu kurz"
      }), username : z.string().min(1, {
        message : "Benutzername ist zu kurz"
      })
  })

  const form = useForm<z.infer<typeof formSchema>>({
      resolver : zodResolver(formSchema),
      defaultValues : {
          name : name || "",
          username : username ||  "",
      }
  })



   

    return (
      <div className="grid grid-cols-2 gap-2">
            
            <Sheet>
                <SheetTrigger asChild>
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
                        <SheetTitle>Profil bearbeiten</SheetTitle>
                        <SheetDescription>
                            Ändere deinen Namen und deinen Benutzernamen. Änderungen sind für andere Sichtbar.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value={name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right text-sm">
                                Nutzername
                            </Label>
                            <Input id="username" value={username} className="col-span-3" />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="bg-blue-900 hover:bg-blue-900/80">Änderungen speichern.</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
          
        </div>
    )
}

export default Settings;