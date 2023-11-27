import { auth } from "@clerk/nextjs";
import RatingDialog from "./rating-course-dialog";


const RatingBox = () => {

    const { userId } = auth();

    return ( 
        <div>
            <RatingDialog
            userId = {userId || "Zero"}
            />
        </div>
     );
}
 
export default RatingBox;