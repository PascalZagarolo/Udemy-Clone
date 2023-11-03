'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreVerticalIcon, icons } from 'lucide-react';
import { useState } from "react";
import toast from "react-hot-toast";
import { set } from 'zod';





const ReportToolTip = ({

}) => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <div>
        <Dialog open={isOpen}>
            <DialogContent>
                ijpsodjpfküsdf
            </DialogContent>
        </Dialog>
        
        <Button variant="ghost" aria-controls="radix-:R2mqqrcq:">
                        <MoreVerticalIcon className="h-4 w-4" />
            </Button>
            </div>
            </>

    );
}

export default ReportToolTip;