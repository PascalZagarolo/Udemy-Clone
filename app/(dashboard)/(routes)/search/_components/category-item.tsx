'use client';

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryItemProps {
    key : string,
    label? : string,
    icon? : IconType,
    value : string
}


const CategoryItem: React.FC<CategoryItemProps> = ({
    key,
    label,
    icon : Icon,
    value
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryName");
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                categoryName : isSelected ? undefined : value,
                title : currentTitle,
            }
        }, { skipNull : true , skipEmptyString : true});

        router.push(url);
    }
    return ( 
        <div>
            <button className={cn
                ("py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
                isSelected && "border-sky-700 bg-sky-200/20 text-sky-800")} 
                type ="button"
                onClick={onClick}>
            { Icon && (
                <Icon size={20}/>
            )}
            <div className="truncate">
                {label}
            </div>
            </button>
        </div>
     );
}
 
export default CategoryItem;