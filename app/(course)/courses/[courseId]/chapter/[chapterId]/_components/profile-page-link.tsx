'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";


interface ProfilePageLinkProps {
    courseOwner_username : string,
    courseOwner_id : string,
    imageUrl : string,
    creationDate? : Date;
}


const ProfilePageLink: React.FC<ProfilePageLinkProps> = ({
    courseOwner_id,
    courseOwner_username,
    imageUrl,
    creationDate
}) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/user/${courseOwner_id}`)
    }

    const dateFormatter = (date : Date) => {
        const pDate = new Date(date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    return ( 
        <div>
             <h1 className="flex justify-between font-medium text-base mb-2 mt-4">
              
             <Image src={imageUrl} width={50} height={50} alt="profilepic"
                className="rounded-full"/>
              <button className="mr-auto ml-2" onClick={onClick}><p className="mr-auto ml-2 text-blue-800 font-bold text-lg"> {courseOwner_username} </p> </button>
            
              
            </h1>
            {creationDate && (
                <div className="mt-2 flex justify-start font-medium items-center mb-4">
                    erstellt am : <p className="ml-2 text-gray-800/40 font-medium text-sm">{dateFormatter(creationDate)}</p>
                </div>
              )}
        </div>
     );
}
 
export default ProfilePageLink;