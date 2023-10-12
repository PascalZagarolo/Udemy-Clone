import { Button } from "@/components/ui/button";

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


    return ( 
        <Button  className="bg-blue-800">
            {formattedPrice(price!)}
        </Button>
     );
}
 
export default CourseEnrollButton;