import { cn } from "@/lib/utils";

interface ChatMessagesProps {
    content : string
    ownMessage? : boolean
    imageUrl? : string
}


const ChatMessages: React.FC<ChatMessagesProps> = ({
    content,
    ownMessage,
    imageUrl
}) => {

    

    return ( 
        <div className=" w-full flex ">
            <div className={cn("justify-start items-center rounded-md", ownMessage ? "bg-blue-500/50" : "bg-green-600/20" )}>
            <div className="text-base font-semibold mb-2 ml-4 mr-4 mt-4">
                {content}
                <div>
                <p className="text-xs text-gray-500/50 mt-2"> 12:13 Uhr</p>
                </div>
            </div>
                
            </div>
            
        </div>
     );
}
 
export default ChatMessages;