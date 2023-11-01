'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreVerticalIcon, icons } from 'lucide-react';
import { useState } from "react";
import toast from "react-hot-toast";




const ReportToolTip= ({
    
}) => {


    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        //! implement report functionality

        toast.success("Kommentar wurde erfolgreich gemeldet")
        setIsOpen(false)
    }

    const onOpen = () => {
        setIsOpen(isOpen => !isOpen)
        console.log(isOpen)
    }
    

    return (
        <div>
            <Button variant="ghost" aria-controls="radix-:R2mqqrcq:" onClick={onOpen}>
                <MoreVerticalIcon className="h-4 w-4 hover:bg-gray-300" />
            </Button>   
        </div>



    );
}

export default ReportToolTip;