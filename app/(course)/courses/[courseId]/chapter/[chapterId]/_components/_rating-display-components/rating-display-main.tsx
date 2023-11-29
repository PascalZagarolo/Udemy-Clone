import { db } from "@/lib/db";

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
        <div>
            <div>
                <p>5 Sterne {fiveStars.length} / {ratings.length} </p>
                <p>4 Sterne {fourStars.length} / {ratings.length} </p>
                <p>3 Sterne {threeStars.length} / {ratings.length}  </p>
                <p>2 Sterne {twoStars.length} / {ratings.length}  </p>
                <p>1 Sterne {oneStars.length} / {ratings.length} </p>

            </div>
        </div>
     );
}
 
export default DisplayRating;