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

interface CommentContentProps {
    comment : Comments;
    username: string;
}

const formattedDate =  (date : Date) => {

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString("de-DE");

    
}



const CommentContent: React.FC<CommentContentProps> = ({
    comment,
    username
}) => {
    
    const [isEditing, setIsEditing] = useState(false);

    const onClick = () => {
        setIsEditing(true)
    }
    

    const formschema = z.object({
        content : z.string().min(1, {
            message : "Kommentar ist zu kurz"
        })
    })

    const form = useForm<z.infer<typeof formschema>>({
        resolver : zodResolver(formschema),
        defaultValues : {
            content : comment.content
        }
    })
    
    const onSubmit = (values : z.infer<typeof formschema>) => {
        console.log(values)
    }

    const { isSubmitting , isValid } = form.formState;

    return (
        <div key={comment.id}>
            <div className="mt-4 text-medium text-semibold text-gray-900 hover:text-gray-900/80 font-semibold" >
                <p>{username}</p>
            </div>
            <div className="text-sm text-gray-800/80">
                <p>{formattedDate(comment.createdAt)}</p>
            </div>
            <div className="text-sm text-semibold flex items-center justify-between">
                {!isEditing ? (
                    <p>{comment.content}</p>
                ) : (
                    <Form
                    {...form}
                    
                    >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Dialog open={isEditing}
                            onOpenChange={() => setIsEditing(false)}
                            >
                             <DialogContent>   
                             <DialogHeader >
                                <DialogTitle className="flex">
                                
                                    <MessageCircleIcon className="w-6 h-6"/>
                                    <p className="ml-4"> Inhalt deines Kommentars bearbeiten </p>
                                    
                                    
                                </DialogTitle>
                                
                                    
                                    <p className="text-sm text-gray-700/70"> Änderungen werden sofort übernommen und sind nach dem speichern für alle sichtbar </p>
                                </DialogHeader>
                            <FormField
                            control={form.control}
                            name="content"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        className="mt-4"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            >

                            </FormField>
                            <Button type="submit"  className="mt-4 bg-blue-800 hover:bg-blue-800/80" disabled={!isValid || isSubmitting}>
                                Änderungen speichern
                            </Button>
                            </DialogContent>
                            </Dialog>
                        </form>
                    </Form>
                )}
                
                <div className="ml-auto">
                    <EditToolTip
                    onClick={onClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommentContent;