import CourseCard from "@/components/course-card";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { Clapperboard } from "lucide-react";

interface UserCoursesProps {
    user : User;
}


const UserCourses: React.FC<UserCoursesProps> = async ({
    user
}) => {

    const ownerId = user.id;

    const courses = await db.course.findMany({
        where : {
            userId : ownerId
        }, include : {
            chapters : true,
            category : true,
            
        }
    })

    return ( 
        <div className="mt-32">
            <h2 className="text-2xl font-semibold mb-4 justify-start flex">
               <Clapperboard className="mr-4 mb-2"/> Meine Kurse ( <p className="text-blue-800 font-bold"> {courses.length} </p> )
            </h2>
            <main>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {courses.map((course) => (
                        <div id={course.id}>
                            <CourseCard 
                            id = {course.id}
                            title={course.title}
                            imageUrl={course.imageUrl || ""}
                            chaptersLength={course.chapters.length}
                            price={course.price || 0}
                            progress={0}
                            category={course.category?.name || ""}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
     );
}
 
export default UserCourses;