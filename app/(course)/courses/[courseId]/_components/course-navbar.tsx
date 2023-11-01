import NavBarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseMobileSideBar from "./course-mobile-sidebar";

interface CourseNavBarProps {
    course : Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null
        })[]
    }
    progressCount : number;
}


const CourseNavBar: React.FC<CourseNavBarProps> = ({
    course,
    progressCount
}) => {
    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseMobileSideBar
            course = {course}
            progressCount = {progressCount}
            />
            <NavBarRoutes username=""/>
        </div>
     );
}
 
export default CourseNavBar;