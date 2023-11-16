import CourseCard from "@/components/course-card";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { Clapperboard } from "lucide-react";
import UserFooter from "./user-footer";
import { getCourses } from "@/actions/get-courses";

interface UserCoursesProps {
    user : User;
}


const UserCourses: React.FC<UserCoursesProps> = async ({
    user
}) => {
    let comment_amount = 0;
    const ownerId = user.id;

    const courses = await db.course.findMany({
        where : {
            userId : ownerId,
            isPublished : true
        }, include : {
            chapters: {
                include : {
                    comments : true
                }
            },
            category : true,
            
        }
    })

    

    for(let i = 0; i < courses.length; i++) {
        for(let j = 0; j < courses[i].chapters.length; j++) {
            comment_amount += courses[i].chapters[j].comments.length;
        }
    }

    return ( 
        <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-4 justify-start flex">
               <Clapperboard className="mr-4 mb-2"/> Meine Kurse ( <p className="text-blue-800 font-bold"> {courses.length} </p> )
            </h2>
            <main>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {courses.map((course) => (
                            <CourseCard 
                            id = {course.id}
                            title={course.title}
                            imageUrl={course.imageUrl || ""}
                            chaptersLength={course.chapters.length}
                            price={course.price || 0}
                            progress={0}
                            category={course.category?.name || ""}
                            />
                    ))}
                </div>
            </main>
            <div className="mt-32">
                <UserFooter />
            </div>
        </div>
     );
}
 
export default UserCourses;