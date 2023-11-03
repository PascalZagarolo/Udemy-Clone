'use client';

import { getUser } from "@/actions/get-user";
import { getUserName } from "@/actions/get-username";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Comments } from "@prisma/client";
import { MessageCircleIcon, MessageSquare, MoreVerticalIcon } from "lucide-react";
import { useState } from "react";
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
import ReportToolTip from "../report-tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Radio } from "@radix-ui/react-radio-group";



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

    const [isEditing, setIsEditing] = useState(false);

    const onClick = () => {
        setIsEditing(true)
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

    const reportTrigger = () => {

        setOpenReport(true);

        return (
            <Dialog open>
                <DialogContent>
                    dsfsd
                </DialogContent>
            </Dialog>
        )
    }

    const { isSubmitting, isValid } = form.formState;

    const ownComment = comment.userId === userId;

    const [openReport, setOpenReport] = useState(false);

    return (
        <div key={comment.id} className="hover:bg-gray-300/90 mt-4">
            <div className="text-medium text-semibold text-gray-900 hover:text-gray-900/70 font-semibold flex justify-between " >

                <p>{username}</p>
                {comment.isEdited && (
                    <p className="mr-auto ml-2 text-xs text-gray-700/50 items-center justify-evenly mt-1">(bearbeitet)</p>
                )}
            </div>
            <div className="text-sm text-gray-800/80">
                <p>{formattedDate(comment.createdAt)}</p>
            </div>

            <div className="text-sm text-semibold flex items-center justify-between">
                {!isEditing ? (
                    <p>{comment.content}</p>
                ) : (
                    <Dialog open={isEditing}
                        onOpenChange={() => setIsEditing(false)}>
                        <DialogContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>

                                    <DialogHeader >
                                        <DialogTitle className="flex">
                                            <MessageCircleIcon className="w-6 h-6" />
                                            <p className="ml-4"> Inhalt deines Kommentars bearbeiten </p>
                                        </DialogTitle>
                                        <p className="text-sm text-gray-700/70"> Änderungen werden sofort übernommen und sind nach dem speichern für alle sichtbar </p>
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
                                                        className="mt-4"
                                                    />

                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="mt-4 bg-blue-800 hover:bg-blue-800/80" disabled={!isValid || isSubmitting}>
                                        Änderungen speichern
                                    </Button>

                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                )}
                <div className="ml-auto">


                    {!isEditing && ownComment && (
                        <EditToolTip
                            onClick={onClick}
                        />
                    )}

                    {!isEditing && !ownComment && (
                        <>
                            <Dialog open={openReport} onOpenChange={() => setOpenReport(!openReport)}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            <p className="text-base font-medium"> Aus welchem Grund möchtest du diesen
                                                <label className="text-blue-800 font-semibold"> Kommentar </label>
                                                melden? </p>
                                        </DialogTitle>
                                    </DialogHeader>
                                    ....
                                </DialogContent>
                            </Dialog>
                            <Popover>
                                <PopoverTrigger>
                                    <ReportToolTip
                                    />
                                </PopoverTrigger>
                                <PopoverTrigger className="mb-4" asChild>
                                    <button className="rounded-md" onClick={reportTrigger}>
                                        <PopoverContent side="top" className="border-r hover:bg-gray-400/50 flex items-center justify-center w-[200px] h-[50px] mb-4 mr-8 ">
                                            <label className="font-semibold text-sm">
                                                Kommentar melden
                                            </label>
                                        </PopoverContent>
                                    </button>
                                </PopoverTrigger>
                            </Popover>
                        </>
                    )}



                </div>
            </div>
        </div>
    );
}

export default CommentContent;