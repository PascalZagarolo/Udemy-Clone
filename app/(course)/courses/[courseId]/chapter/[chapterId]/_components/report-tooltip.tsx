'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreVerticalIcon, icons } from 'lucide-react';
import { useState } from "react";
import toast from "react-hot-toast";



interface ReportToolTipProps {
    onClick : () => void;

 }

const ReportToolTip: React.FC<ReportToolTipProps> = ({
    onClick
}) => {


   
    return (
        <div>
            <Button variant="ghost" aria-controls="radix-:R2mqqrcq:" onClick={onClick}>
                <MoreVerticalIcon className="h-4 w-4 hover:bg-gray-300" />
            </Button>   
        </div>



    );
}

export default ReportToolTip;