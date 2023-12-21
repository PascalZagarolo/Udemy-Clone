import { cn } from "@/lib/utils";
import Image from "next/image";
import EditMessage from "./edit-message";
import DeleteChatMessage from "./delete-chat-message";

interface ChatMessagesProps {
    content : string
    ownMessage? : boolean
    imageUrl? : string
    date : Date
    userName : string
    messageId? : string
    isEdited : boolean
}


const ChatMessages: React.FC<ChatMessagesProps> = ({
    content,
    ownMessage,
    imageUrl,
    date,
    userName,
    messageId,
    isEdited
}) => {

    const convertToEuropeanTime = (date : Date) => {     
        const newDate = date;
        return newDate.toLocaleString('de-DE', { hour: 'numeric', minute: 'numeric', hour12: true })
    };

    

    const isImageFile = (fileName : string) => {
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]; //Datei-Endungen für Bilder
        const extension = fileName.toLowerCase().substring(fileName.lastIndexOf("."));
      
        return imageExtensions.includes(extension);
      };
    

    return ( 
        <div className=" w-full flex">
            <div className={cn("justify-start items-center rounded-md", ownMessage ? "bg-blue-500/50" : "bg-green-600/20" )}>
            {imageUrl && isImageFile(imageUrl) ? (
                <Image src={imageUrl} width={200} height={200} alt="image"/>
            ) : (
                <div className="text-sm font-semibold mb-2 ml-4 mr-4 mt-4">
                    <p className="text-sm mb-2 text-gray-500/80 flex justify-start items-center">{userName}
                    {isEdited && (
                        <p className="text-xs ml-2 mr-2"> (bearbeitet)</p>
                    )}
                    {ownMessage && (
                        <div className="text-gray-900/70 flex justify-start ml-auto">
                        <EditMessage
                        messageId = {messageId!}
                        />
                        <DeleteChatMessage
                        messageId = {messageId!}
                        />
                        </div>
                    )}
                    </p>
                {content}
                <div>
                <p className="text-xs text-gray-500/50 mt-2">{convertToEuropeanTime(date)}</p>
                </div>
            </div>
            )}
            
            
                
            </div>
            
        </div>
     );
}
 
export default ChatMessages;