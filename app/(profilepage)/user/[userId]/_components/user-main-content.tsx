import { User } from "@prisma/client";
import UserCourses from "./user-courses";
import UserDescription from "./user-description";
import Image from "next/image";
import UserInformation from "./user-information";
import UserAlert from "./user-alert";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import UserFooter from "./user-footer";

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

    const { userId } = auth();

    let isOwnSite;

    userId === user.id ? isOwnSite = true : isOwnSite = false; 

    let commentAmount = 0;

    for(let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courses[i].chapters.length; j++) {
            commentAmount += courses[i].chapters[j].comments.length;
        }
    }

    let chapterAmount = 0;

    for (let i = 0; i < courses.length; i++) {
        chapterAmount += courses[i].chapters.length;
    }

    return ( 
        <div className="ml-16 mt-8">
            
            <UserInformation
            userId = {user.id}
            courseAmount = {courses.length}
            chapterAmount = {chapterAmount}
            commentAmount = {commentAmount}
            />
            <div className="mr-80">
            <UserDescription
            isOwnSite = {isOwnSite}
            user={user}
            />
            </div>     
            
            <UserCourses
            user = {user}
            />
            
        </div>
     );
}
 
export default UserMainContent;