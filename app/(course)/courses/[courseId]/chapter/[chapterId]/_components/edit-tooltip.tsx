'use client';

import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";

interface EditToolTipProps {
    onClick : () => void
  
}

const EditToolTip: React.FC<EditToolTipProps> = ({
    onClick,
   
}) => {
    return ( 
        <div>
            <Button variant="ghost" aria-controls="radix-:R2mqqrcq:" onClick={onClick}>
                        <MoreVerticalIcon className="h-4 w-4" />
            </Button>
        
        </div>
       
     );
}
 
export default EditToolTip;