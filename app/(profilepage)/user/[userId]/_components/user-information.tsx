import Banner from "@/components/banner";
import FileUpload from "@/components/file-upload";
import { db } from "@/lib/db";
import { UploadButton } from "@uploadthing/react";
import axios from "axios";
import { BadgeIndianRupee, Check, Clapperboard, Film, MessagesSquare, Settings2, Star, User, VerifiedIcon } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import UploadProfilePic from "./user-upload-profilepic";

import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import UserSocialDialog from "./user-social-links-dialog";


interface UserInformationProps {
    userId: string;
    courseAmount: number;
    commentAmount : number;
    chapterAmount : number;
    customerAmount : number;
}

const UserInformation: React.FC<UserInformationProps> = async ({
    userId,
    courseAmount,
    commentAmount,
    chapterAmount,
    customerAmount,
}) => {

    const isOwnSite = auth().userId === userId;

    

    const user = await db.user.findUnique({
        where : {
            id : userId
        }
    })
    

    return (
        
        <div className="w-full mb-8  mt-8 ">

        {isOwnSite &&
            <UserSocialDialog />
        }
            <div className="justify-start flex">
            <div className="rounded-md">
                <Image src={user?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} width={120} height={120} alt="teacher"
                className="rounded-full"/>
            </div>
            <div className="">
                <Check className="text-blue-800" />
            </div>


            <div className="ml-8">
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center md:text-xl">
            <User className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> {customerAmount} </p> {customerAmount > 1 ? "Kunden" : "Kunde"}
            </div>

            <div className="ml-8 font-semibold text-2xl justify-start flex mt-6 items-center md:text-xl">
            <MessagesSquare className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> {commentAmount} </p> Kommentare
            </div>
            </div>


            <div className="ml-4">
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center md:text-xl">
            <Clapperboard className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> {courseAmount} </p> Kurs erstellt
            </div>
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center md:text-xl">
            <Film className="mr-4" />
                <p className="text-blue-800 mr-2 font-bold"> {chapterAmount} </p> Kapitel
            </div>
            </div>

            <div className="ml-4">
            <div className="ml-8 font-semibold text-2xl justify-start flex mt-4 items-center">
            
            </div>
            
            </div>

            
        </div>
        <div className="ml-1 items-center">
        <UploadProfilePic/>
        </div>
        </div>
        
     );
}
 
export default UserInformation;