'use client';

import { Category } from "@prisma/client";
import { IconType, } from "react-icons"
import { 
    FcMusic,
    FcPodiumWithAudience,
    FcSportsMode,
    FcEngineering,
    FcMultipleDevices,
    FcAcceptDatabase

} from "react-icons/fc";
import CategoryItem from "./category-item";
import { Label } from '@/components/ui/label';

interface CategoriesProps {
    items : Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Musik" : FcMusic,
    "Sport" : FcSportsMode,
    "Filme & Kunst" : FcPodiumWithAudience,
    "Ingenieurswissenschaften" : FcEngineering,
    "Webentwicklung" : FcMultipleDevices,
    "Softwareentwicklung" : FcAcceptDatabase,
}

const Categories: React.FC<CategoriesProps> = ({
    items
}) => {
    return ( 
        <div className="items-center flex gap-x-2 overflow-x-auto pb-2">
           {items.map((item) => (
            <CategoryItem
            key = {item.id}
            label = {item.name}
            icon = {iconMap[item.name]}
            value = {item.name}
            />
            ))}
        </div>
     );
}
 
export default Categories;