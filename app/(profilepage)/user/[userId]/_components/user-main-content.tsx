import { User } from "@prisma/client";
import UserCourses from "./user-courses";
import UserDescription from "./user-description";

interface UserMainContentProps {
    user : User;
}

const UserMainContent: React.FC<UserMainContentProps> = ({
    user
}) => {
    return ( 
        <div className="mt-4">
            <UserDescription/>
            <UserCourses
            user = {user}
            />
        </div>
     );
}
 
export default UserMainContent;