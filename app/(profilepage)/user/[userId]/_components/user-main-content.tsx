import { User } from "@prisma/client";
import UserCourses from "./user-courses";
import UserDescription from "./user-description";
import Image from "next/image";

interface UserMainContentProps {
    user : User;
    imageUrl : string
}

const UserMainContent: React.FC<UserMainContentProps> = ({
    user,
    imageUrl
}) => {
    return ( 
        <div className="mt-8 ml-16">     
            <UserDescription/>
            <UserCourses
            user = {user}
            />
        </div>
     );
}
 
export default UserMainContent;