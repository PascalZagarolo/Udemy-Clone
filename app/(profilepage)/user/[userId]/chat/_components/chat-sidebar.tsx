import { Contact2 } from "lucide-react";

const ChatSideBar = () => {
    return ( 
        <div className="w-full"> 
        <div className="ml-8"> 
            <p className="text-3xl font-semibold mt-4  mr-8 flex items-center">
            <p className="justify-center items-center mr-2"><Contact2/></p>
            Chats
            </p>
            <p className="text-medium font-semibold text-gray-800/80 text-sm mt-1 "> existierende Chats ansehen </p>
        </div>
        </div>
     );
}
 
export default ChatSideBar;