interface ChatMessagesProps {
    content : string
    
    imageUrl? : string
}


const ChatMessages: React.FC<ChatMessagesProps> = ({
    content,
    
    imageUrl
}) => {

    

    return ( 
        <div className=" w-full flex ">
            <div className="justify-start items-center bg-blue-800/30 rounded-md">
            <div className="text-base font-semibold mb-2 ml-4 mr-4 mt-2">
                {content}
                <div>
                <p className="text-xs text-gray-500/50"> 12:13 Uhr</p>
                </div>
            </div>
                
            </div>
            
        </div>
     );
}
 
export default ChatMessages;