'use client';

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteToolTipProps {
    onDelete : () => void
}


const DeleteToolTip: React.FC<DeleteToolTipProps> = ({
    onDelete
}) => {
    return ( 
        <Button variant="ghost">
            <Trash2 className="h-4 w-4 text-blue-800"/>
        </Button>
     );
}
 
export default DeleteToolTip;