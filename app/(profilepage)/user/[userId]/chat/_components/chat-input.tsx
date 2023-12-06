'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const ChatInput = () => {
    return ( 
        <div className="w-full">
            <div className="flex justify-start">
                <Button variant="ghost" className="ml-4">
                    <Send
                    className="text-blue-800"
                    />
                </Button>
                <div className="ml-4">
                    <Input 
                    className="w-80"
                    />
                </div>
            </div>
            
        </div>
     );
}
 
export default ChatInput;