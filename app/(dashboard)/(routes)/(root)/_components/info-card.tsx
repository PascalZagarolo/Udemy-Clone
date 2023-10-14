import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";


interface InfoCardProps {
    icon : LucideIcon,
    label : string,
    numberOfItems : number,
    variant? : "default" | "success";

}


const InfoCard: React.FC<InfoCardProps> = ({
    icon : Icon,
    label,
    numberOfItems,
    variant
}) => {
    return ( 
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge 
            variant={variant}
            icon={Icon}
            />
            <div>
                <p className="font-medium">
                    {label}
                </p>
                <p className="text-gray-500 text-sm">
                {numberOfItems} {numberOfItems === 1 ? "Kurs befindet" : "Kurse befinden"} sich in deinem Besitz
                </p>
            </div>
        </div>
     );
}
 
export default InfoCard;