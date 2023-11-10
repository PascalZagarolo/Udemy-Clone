import { User } from "@prisma/client";
import UserCourses from "./user-courses";
import UserDescription from "./user-description";
import Image from "next/image";
import UserInformation from "./user-information";
import UserAlert from "./user-alert";
import { db } from "@/lib/db";

interface UserMainContentProps {
    user : User;
    imageUrl : string
}

const UserMainContent: React.FC<UserMainContentProps> = async ({
    user,
    imageUrl,
}) => {

    const courses = await db.course.findMany({
        where : {
            userId : user.id
        }, include : {
            chapters : {
                include : {
                    comments : true
                }
            
            }
        }
    })

    let commentAmount = 0;

    for(let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courses[i].chapters.length; j++) {
            commentAmount += courses[i].chapters[j].comments.length;
        }
    }

    return ( 
        <div className="ml-16 mt-4">
            <UserAlert />
            <UserInformation
            userId = {user.id}
            courseLength = {courses.length}
            commentLength = {commentAmount}
            />     
            <UserDescription/>
            <UserCourses
            user = {user}
            />
        </div>
     );
}
 
export default UserMainContent;