'use client';

import { cn } from "@/lib/utils";
import { CheckCircle, PlayCircleIcon, LockIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


interface CourseSideBarItemProps {
    key : string,
    id : string
    label : string,
    isCompleted : boolean,
    courseId : string,
    isLocked : boolean
}


const CourseSideBarItem: React.FC<CourseSideBarItemProps> = ({
    key,
    label,
    id,
    isCompleted,
    courseId,
    isLocked
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? LockIcon : 
        (isCompleted ? CheckCircle : PlayCircleIcon);

        const isActive = pathname?.includes(id);

        const onClick = () => {
            router.push(`/courses/${courseId}/chapter/${id}`)
        }
    return ( 
        <button type="button" className={cn(
        `flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all
         hover:text-slate-600 hover:bg-slate-300/20 my-4`,
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
        )}
        onClick={onClick}
        >
            <div className="flex items-center gap-x-2 px-4">
                <Icon size={20}
                className={cn("text-slate-500", isActive && "text-slate-700", isCompleted && "text-emerald-700")}
                />
                {label}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-slate-200 h-full transition",
                                isActive && "opacity-100",
                                isCompleted && "border-emerald-700")} />

            
        </button>
     );
}
 
export default CourseSideBarItem;

