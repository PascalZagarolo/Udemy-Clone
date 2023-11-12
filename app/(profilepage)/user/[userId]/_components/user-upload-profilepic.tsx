'use client';

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";

const UploadProfilePic = () => {

    const router = useRouter();
    const params = useParams();

    const formSchema = z.object({
        url: z.string().min(1)
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log(values);

        try {
            await axios.patch(`/api/user/${params.userId}/profilepic`, values)
            console.log("Neues pfp: ", values)
            
        } catch {
            toast.error("Fehler beim Speichern")
        } finally {
            toast.success("Profilbild erfolgreich geändert");
            router.refresh();
        }
    }



    return (

        <Dialog>
            <DialogTrigger className="font-semibold">
                Profilbild ändern
                </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Lade ein neues Profilbild hoch</DialogTitle>
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
                    <Button className="bg-blue-800 hover:bg-blue-800/80" type="submit" >Änderungen speichern</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default UploadProfilePic;