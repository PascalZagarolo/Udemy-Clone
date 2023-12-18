'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

import { PencilIcon, PencilLine } from "lucide-react";

const EditMessage = () => {


    const onClick = () => {
        console.log("...")
    }

    return ( 
        <div>
            <Dialog>
                <DialogTrigger>
                    <PencilIcon  className="ml-2 h-4 w-4 hover:text-gray-900"/>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <p>agsdhuiojas</p>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            
        </div>
     );
}
 
export default EditMessage;