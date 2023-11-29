import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { StarHalf } from "lucide-react";

interface DisplayRatingProps {
    courseId : string
}

const DisplayRating: React.FC<DisplayRatingProps> = async({
    courseId
})  => {


    const ratings = await db.ratings.findMany({
        where : {
            courseId 
        }
    })

    const fiveStars = ratings.filter(rating => rating.score === 5);
    const fourStars = ratings.filter(rating => rating.score === 4)
    const threeStars = ratings.filter(rating => rating.score === 3)
    const twoStars = ratings.filter(rating => rating.score === 2)
    const oneStars = ratings.filter(rating => rating.score === 1)

    return ( 
        <div className="ml-8 w-80">
            <div>
                <h3 className="font-semibold text-xl mb-4">
                   <StarHalf className="text-yellow-400 w-8 h-8"/> Rezensionen ({ratings.length}) 
                </h3>

                <div className="text-lg font-semibold mb-1 flex justify-start items-center"> 
                    5 Sterne
                   
                </div>

                <div className="text-base font-semibold mb-1"> 
                    4 Sterne
                    
                </div>

                <div className="text-medium font-semibold mb-1"> 
                    3 Sterne
                </div>

                <div className="text-medium font-semibold mb-1"> 
                    2 Sterne
                </div>

                <div className="text-medium font-semibold mb-1"> 
                    1 Stern
                </div>


            </div>
        </div>
     );
}
 
export default DisplayRating;