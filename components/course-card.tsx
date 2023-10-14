import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookCopy, EuroIcon, Minus, SeparatorVerticalIcon, Video } from "lucide-react";
import CourseProgress from "./course-progress";

interface CourseCardProps {
   
    id: string,
    title: string,
    imageUrl: string,
    chaptersLength: number,
    price: number,
    progress: number | null,
    category: string
}


const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(price);
}

const CourseCard: React.FC<CourseCardProps> = ({
    
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category
}) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={title}
                        src={imageUrl}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                </div>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-1 text-slate-500">
                        <IconBadge icon={BookCopy} size="sm" />
                        <span>
                            {chaptersLength} Kapitel
                        </span>
                    </div>
                </div>
                <div>
                    {progress !== null ? (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="success"
                            value={progress}
                        />
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {formattedPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default CourseCard;


