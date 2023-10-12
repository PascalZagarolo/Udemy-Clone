import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
    variant? : "success" | "default";
    value : number;
    size? : "default" | "success"

}

const colorByVariant = {
    default : "text-sky-700",
    success : "text-sky-700"
}

const sizeByVariant = {
    default : "text-sm",
    success : "text-xs"
}

const CourseProgress: React.FC<CourseProgressProps> = ({
    variant,
    value
}) => {
    return ( 
        <div>
            <Progress
            className="h-2"
            value={value}
            variant={variant}
            />
            <p className={cn("font-medium mt-2 text-sky-700",
                colorByVariant[variant || "default"],
                sizeByVariant[variant || "default"], )}>
                {Math.round(value)} %
            </p>
        </div>
     );
}
 
export default CourseProgress;