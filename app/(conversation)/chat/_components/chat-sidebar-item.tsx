'use client';

import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ChatSideBarItemProps {
    user1Id : string;
    user2Id : string;
    user1_username : string;
    user2_username : string;
    userId : string;
    user1_imageUrl : string;
    user2_imageUrl : string;
}


const ChatSideBarItem: React.FC<ChatSideBarItemProps> = ({
    user1Id,
    user2Id,
    user1_username,
    user2_username,
    userId,
    user1_imageUrl,
    user2_imageUrl
}) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/chat/${user1Id === userId ? user2Id : user1Id}`)
    }

    
    return ( 
        <div className="flex justify-start items-center mt-4">
            <Button variant="ghost" onClick={onClick}>
                    <div className="items-center">
                    {user1Id === userId ? (
                            <Image 
                            src={user2_imageUrl}
                            className="rounded-full"
                            height={40}
                            width={40}
                            alt="Profile Picture"
                            />
                        ) : (
                            user1_username
                        )}
                    </div>
                    <User2
                    className="h-4 w-4 ml-2 font-bold"
                    />
                    <p className="font-semibold ml-2">
                        {user1Id === userId ? (
                            user2_username
                        ) : (
                            user1_username
                        )}
                    </p>
                    </Button>
                </div>
     );
}
 
export default ChatSideBarItem;