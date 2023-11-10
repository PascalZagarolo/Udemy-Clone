import Banner from "@/components/banner";
import { db } from "@/lib/db";
import { BadgeIndianRupee, Check, Clapperboard, Film, MessagesSquare, Star, User, VerifiedIcon } from "lucide-react";
import Image from "next/image";


interface UserInformationProps {
    userId: string;
    courseAmount: number;
    commentAmount : number;
    chapterAmount : number;
}

const UserInformation: React.FC<UserInformationProps> =  ({
    userId,
    courseAmount,
    commentAmount,
    chapterAmount
}) => {

    
    

    return ( 
        <div className="w-full mb-8  mt-8">
            <div className="justify-start flex">
            <div >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" width={100} height={100} alt="teacher"/>
            </div>
            <div className="">
                <Check className="text-blue-800" />
            </div>


            <div className="ml-8">
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center">
            <User className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> 200 </p> Kunden
            </div>

            <div className="ml-8 font-semibold text-2xl justify-start flex mt-6 items-center">
            <MessagesSquare className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> {commentAmount} </p> Kommentare erhalten
            </div>
            </div>


            <div className="ml-4">
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center">
            <Clapperboard className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> {courseAmount} </p> Kurs erstellt
            </div>
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center">
            <Film className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> {chapterAmount} </p> Kapitel geteilt
            </div>
            </div>

            <div className="ml-4">
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center">
            <Star className="mr-4 text-yellow-400" />
                <p className="text-yellow-400 mr-2 font-bold"> 4.3 </p> Sterne-Bewertung
            </div>
            
            </div>

            
        </div>
        </div>
     );
}
 
export default UserInformation;