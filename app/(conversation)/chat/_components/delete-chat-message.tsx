'use client' ;

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";

import { Trash, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteChatMessageProps { 
    messageId : string
}

const DeleteChatMessage: React.FC<DeleteChatMessageProps> = ({
    messageId
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const onClick = () => {
        axios.delete(`/api/message/${messageId}/delete`)
    }

    return ( 
        <div>
            
                <Dialog>
                    <DialogTrigger>
                        <Trash2 className="h-4 w-4 ml-2"/>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex justify-start items-center">
                               <X className="text-rose-600 mr-2"/> Nachricht löschen ?
                            </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <div>
                                Möchtest du diese Nachricht unwideruflich löschen ?   
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <DialogTrigger>
                            <Button variant="ghost">
                                Abbrechen
                            </Button>
                            </DialogTrigger>
                            <Button className="bg-rose-600 hover:bg-rose-900" onClick={onClick}>
                                Löschen
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            
        </div>
     );
}
 
export default DeleteChatMessage;