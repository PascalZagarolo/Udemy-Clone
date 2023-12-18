'use client' ;

import { Trash } from "lucide-react";

const DeleteChatMessage = () => {
    return ( 
        <div>
            <button>
                <Trash className="h-4 w-4 ml-2 hover:text-gray-900"/>
            </button>
        </div>
     );
}
 
export default DeleteChatMessage;