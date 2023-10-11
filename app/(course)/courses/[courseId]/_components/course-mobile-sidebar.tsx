import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";

import CourseSideBar from "./course-sidebar";
import { Menu } from "lucide-react";

interface CourseMobileSideBarProps {

    course : Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null
        })[]
    },
    progressCount : number,

 }


const CourseMobileSideBar: React.FC<CourseMobileSideBarProps> = ({
    course,
    progressCount
}) => {
    return ( 
        <div>
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <CourseSideBar
                course={course}
                progressCount={progressCount}
                />
        </SheetContent>
        </Sheet>
        </div>
     );
}
 
export default CourseMobileSideBar;