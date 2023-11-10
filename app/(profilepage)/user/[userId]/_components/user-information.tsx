import Banner from "@/components/banner";
import { db } from "@/lib/db";
import { BadgeIndianRupee, Check, Clapperboard, MessagesSquare, User, VerifiedIcon } from "lucide-react";
import Image from "next/image";


interface UserInformationProps {
    userId: string;
    courseLength: number;
    commentLength : number;
}

const UserInformation: React.FC<UserInformationProps> =  ({
    userId,
    courseLength,
    commentLength
}) => {

    
    

    return ( 
        <div className="w-full mb-8  mt-8">
            <div className="justify-start flex">
            <div >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" width={100} height={100} alt="teacher"/>
            </div>
            <div className="ml-2">
                <Check className="text-blue-800" />
            </div>


            <div className="ml-8">
            <div className="ml-8 font-bold text-2xl justify-start flex mt-4 items-center">
            <User className="mr-4" />
                <p className="text-blue-800 mr-2"> 200 </p> Kunden
            </div>

            <div className="ml-8 font-bold text-2xl justify-start flex mt-6 items-center">
            <MessagesSquare className="mr-4" />
                <p className="text-blue-800 mr-2"> {commentLength} </p> Kommentare erhalten
            </div>
            </div>


            <div className="ml-4">
            <div className="ml-8 font-bold text-2xl justify-start flex mt-4 items-center">
            <Clapperboard className="mr-4" />
                <p className="text-blue-800 mr-2"> {courseLength} </p> Kurs erstellt
            </div>

            
            </div>

            
        </div>
        </div>
     );
}
 
export default UserInformation;