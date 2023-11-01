import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { BarChart2 } from "lucide-react";

interface CourseProgressProps {
    variant?: "success" | "default";
    value: number;
    size?: "default" | "success"

}

const colorByVariant = {
    default: "text-sky-700",
    success: "text-sky-700"
}

const sizeByVariant = {
    default: "text-sm",
    success: "text-xs"
}

const CourseProgress: React.FC<CourseProgressProps> = ({
    variant,
    value
}) => {
    return (
        <div>
            {value < 100 ? (
                <div>
                <p className={cn("font-medium mt-2 text-sky-700",
                    colorByVariant[variant || "default"],
                    sizeByVariant[variant || "default"],)}>

                    Kurs zu {value} % abgeschlossen.

                </p>
                <Progress
                className="h-2"
                value={value}
                variant={variant}
            />
            </div>
            ): (
                <p className="text-sm text-blue-800 font-semibold">
                    Kurs erfolgreich abgeschlossen!
                </p>
            )}
            


        </div>
    );
}

export default CourseProgress;