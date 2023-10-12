import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSideBarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";


interface CourseSideBarProps {
    course : Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null
        })[]
    },
    progressCount : number,
}


const CourseSideBar: React.FC<CourseSideBarProps> = async ({
    course,
    progressCount
}) => {

    const { userId } = auth();

    if(!userId) {
        return redirect("/")
    }

    const purchased = await db.purchase.findMany({
        where :{
            userId: userId,
            courseId : course.id
        }
    })

    

    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">
                    {course.title}
                </h1>
                {!purchased && (
                    <div className="mt-10">
                        <CourseProgress 
                        variant = "success"
                        size="default"
                        value = {progressCount}
                        />
                    </div> 
                )}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSideBarItem 
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}
                    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLocked={!chapter.isFree && !purchased}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default CourseSideBar;