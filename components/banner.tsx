import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants : {
            variant : {
                warning : "bg-blue-400/80 border-blue-600 text-primary",
                success : "bg-emerald-700 border-emerald-800 text-secondary"
            }
        }, defaultVariants : {
            variant : "warning"
        }
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label : string;
}

const iconMap = {
    warning : AlertTriangle,
    success : CheckCircleIcon
}

const Banner: React.FC<BannerProps> = ({
    label,
    variant
}) => {

    const Icon = iconMap[variant || "warning"]
    return ( 
        <div className={cn(bannerVariants ({variant}))}>
            <Icon className ="h-4 w-4 mr-2" />
            {label}
        </div>
     );
}
 
export default Banner;