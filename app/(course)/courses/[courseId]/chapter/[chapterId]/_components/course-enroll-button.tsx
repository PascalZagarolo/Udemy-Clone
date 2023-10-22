'use client';

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    courseId : string,
    price : number
}

const formattedPrice = (price : number) => {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(price);
}

const CourseEnrollButton: React.FC<CourseEnrollButtonProps> = ({
    courseId,
    price
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const OnClick = async () => {
        try {
            setIsLoading(true);
            
            const response = await axios.post(`/api/courses/${courseId}/checkout`)
            
            window.location.assign(response.data.url)

        } catch {
            toast.error("Fehler beim Kauf");
        } finally {
            setIsLoading(false);
        }
    }


    return ( 
        <Button className="bg-blue-800" onClick={OnClick} disabled={isLoading} size = "sm" aria-controls="radix-:R2mqqrcq:">
           Kaufen für {formattedPrice(price!)}
        </Button>
     );
}
 
export default CourseEnrollButton;