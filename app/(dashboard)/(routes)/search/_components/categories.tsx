'use client';

import { Category } from "@prisma/client";
import { IconType, } from "react-icons"
import { 
    FcMusic,
    FcPodiumWithAudience,
    FcSportsMode,
    FcEngineering,
    FcMultipleDevices,
    FcAcceptDatabase,
    FcAreaChart,
    FcGallery,
    FcBusinessman,
    FcOnlineSupport

} from "react-icons/fc";
import CategoryItem from "./category-item";
import { Label } from '@/components/ui/label';

interface CategoriesProps {
    items : Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Design" : FcGallery,
    "Filme & Kunst" : FcPodiumWithAudience,
    "Gesundheit" : FcSportsMode,
    "Ingenieurswissenschaften" : FcEngineering,
    "Musik" : FcMusic,
    "Mathematik" : FcAreaChart,
    "Softwareentwicklung" : FcAcceptDatabase,
    "Sonstige Dienstleistungen" : FcOnlineSupport,
    "Sport" : FcSportsMode,
    "Webentwicklung" : FcMultipleDevices,
    "Wirtschaft" : FcBusinessman,
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