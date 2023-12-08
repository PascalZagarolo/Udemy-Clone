interface ChatMessagesProps {
    content : string
    
    imageUrl? : string
}


const ChatMessages: React.FC<ChatMessagesProps> = ({
    content,
    
    imageUrl
}) => {

    

    return ( 
        <div className="mb-2 ml-4 mr-4 mt-2 w-full">
            <div>
            <div className="text-base font-semibold">
                {content}
            </div>
            
            </div>
            
        </div>
     );
}
 
export default ChatMessages;