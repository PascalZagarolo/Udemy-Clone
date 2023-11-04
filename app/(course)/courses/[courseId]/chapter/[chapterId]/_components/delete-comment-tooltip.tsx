'use client';

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteToolTipProps {
    onDelete : () => void
    disabled : boolean
}


const DeleteToolTip: React.FC<DeleteToolTipProps> = ({
    onDelete,
    disabled
}) => {
    return ( 
        <Button variant="ghost" disabled={disabled}>
            <Trash2 className="h-4 w-4 text-blue-800"/>
        </Button>
     );
}
 
export default DeleteToolTip;