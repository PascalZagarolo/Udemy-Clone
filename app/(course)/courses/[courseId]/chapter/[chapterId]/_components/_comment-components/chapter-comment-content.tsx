'use client';


import { getUserName } from "@/actions/get-username";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth, clerkClient, useUser } from "@clerk/nextjs";
import { Comments } from "@prisma/client";
import { MessageCircleIcon, MessageSquare, MoreVerticalIcon } from "lucide-react";
import { useState, useEffect } from 'react';
import EditToolTip from "../edit-tooltip";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";



import ReportBox from "./_report_components/report-box";
import LikeBox from "@/components/like-box";
import { Separator } from "@/components/ui/separator";

import DeleteToolTip from "../delete-comment-tooltip";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import Image from "next/image";



interface CommentContentProps {
    comment: Comments;
    username: string;
    userId: string
}

const formattedDate = (date: Date) => {

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString("de-DE");


}



const CommentContent: React.FC<CommentContentProps> = ({
    comment,
    username,
    userId
}) => {
    
    let pfpLink = ""

    const [pfpLoaded, pfpIsLoading] = useState(false);
    
    const [isEditing, setIsEditing] = useState(false);

    const onClick = () => {
        setIsEditing(true)
        try {

        } catch {
            toast.error("Fehler beim Löschen deines Kommentars");
        }
    }

    const formschema = z.object({
        content: z.string().min(1, {
            message: "Kommentar ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {
            content: comment.content
        }
    })

    const params = useParams();
    const router = useRouter();
    const onSubmit = (values: z.infer<typeof formschema>) => {
        try {
            axios.patch(`/api/courses/${params.courseId}/chapters/${comment.chapterId}/comments/${comment.id}`, values);
            toast.success("Kommentar erfolgreich bearbeitet");
            setIsEditing(false);
            router.refresh();
        } catch {
            toast.error("Fehler beim speichern des Kommentars");
        }
    }

    const [isDeleting, setIsDeleting] = useState(false);
    const onDelete = () => {
        setIsDeleting(true);
    }

    const [deleteLoading, setIsDeleteLoading] = useState(false);

    const onDeleteConfirm = () => {
        try {
            setIsDeleteLoading(true);
            axios.delete(`/api/courses/${params.courseId}/chapters/${params.chapterId}/comments/${comment.id}`);
            
        } catch {
            toast.error("Fehler beim löschen")
        } finally {
            setIsDeleteLoading(false);
            toast.success("Kommentar erfolgreich gelöscht");
            router.refresh();
        }
    }
    
    const { isSubmitting, isValid } = form.formState;
    const ownComment = comment.userId === userId;


    return (
        <div key={comment.id} className="sm:mt-2">
               <div className="hover:bg-gray-200/50 mt-4">
               <div className="text-base text-bold text-gray-900 hover:text-gray-900/70 font-semibold flex justify-start " >
                   <div>
                       {pfpLink}
                   </div>
                   <p>{username}</p>
                   {comment.isEdited && (
                       <p className="mr-auto ml-2 text-xs text-gray-700/50 items-center justify-evenly mt-1">(bearbeitet)</p>
                   )}
               </div>
               <div className="text-xs text-gray-700/80 mt-1">
                   <p>{formattedDate(comment.createdAt)}</p>
               </div>
               <div>
               <Separator className="bg-black w-[50px] mt-4 mb-2"/>
               <div className="text-sm text-semibold flex justify-between">
                   {!isEditing ? (
                       <>
                       <p className="mt-2 text-sm">{comment.content}</p>
                       </>
                   ) : (
                       <Dialog open={isEditing}
                           onOpenChange={() => setIsEditing(false)}>
                           <DialogContent className="border-black">
                               <Form {...form}>
                                   <form onSubmit={form.handleSubmit(onSubmit)}>
                                       <DialogHeader >
                                           <DialogTitle className="flex">
                                               <MessageCircleIcon className="w-6 h-6" />
                                               <p className="ml-4 mb-2"> Inhalt deines Kommentars bearbeiten </p>
                                           </DialogTitle>
                                           <p className="text-sm text-gray-700/70"> Änderungen werden sofort übernommen und sind nach dem speichern für alle sichtbar </p>
                                           <Separator className="bg-blue-800 w-[30px]"/>
                                       </DialogHeader>
                                       <FormField
                                           control={form.control}
                                           name="content"
                                           render={({ field }) => (
                                               <FormItem>
                                                   <FormControl>
                                                       <Input
                                                           placeholder="..."
                                                           {...field}
                                                           className="mt-8 selection:border-none"
   
                                                       /> 
                                                   </FormControl>
                                                   <FormMessage />
                                               </FormItem>
                                           )}
                                       />
                                       <Button type="submit" className="mt-8 bg-blue-800 hover:bg-blue-800/80" disabled={!isValid || isSubmitting}>
                                           Änderungen speichern
                                       </Button>
                                   </form>
                               </Form>
                           </DialogContent>
                       </Dialog>
                   )}
                   <div className="ml-auto">
                       {!isEditing && ownComment && (
                           <div className="flex justify-between">
                           <EditToolTip
                               onClick={onClick}
                               
                           />
                           <AlertDialog>
                               <AlertDialogTrigger>
                           <DeleteToolTip 
                           onDelete={onDelete}
                           disabled={deleteLoading}
                           />
                           </AlertDialogTrigger>
                           <AlertDialogContent className="border-black">
                               <AlertDialogHeader>
                                   <AlertDialogTitle className="flex justify-left">
                                       Möchtest du deinen <p className="text-rose-600 ml-2 mr-2 font-semibold"> Kommentar </p> wirklich löschen?
                                   </AlertDialogTitle>
                                   <AlertDialogDescription className="text-gray-700/80 text-sm">
                                       Diese Aktion ist unwiderruflich. Gelöschte Kommentare können nicht wiederhergestellt werden. Alle Antworten auf diesen Kommentar werden ebenfalls gelöscht.
                                   </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter className="mt-4">
                                   <AlertDialogTrigger>
                                       <Button className="bg-black mr-4 hover:bg-black/80">
                                           Abbrechen
                                       </Button>
                                       <Button className="bg-rose-600 hover:bg-rose-600/80" onClick={onDeleteConfirm}>
                                           Kommentar löschen
                                       </Button>
                                   </AlertDialogTrigger>
                               </AlertDialogFooter>
                           </AlertDialogContent>
                           </AlertDialog>
                           </div>
                          
                       )}
   
                       {!isEditing && !ownComment && (
                           <>
                               <ReportBox />
                           </>
                       )}
                   </div>
                   
               </div>
               <Separator className="w-[50px] ml-auto bg-black mt-2 mr-5"/>
               <LikeBox
               comments = {comment}
               />
               </div>
           </div>
        </div>
    )
    
}

export default CommentContent;