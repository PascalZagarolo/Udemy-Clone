'use client';

import { useRouter } from "next/navigation";


interface ProfilePageLinkProps {
    courseOwner_username : string,
    courseOwner_id : string
}


const ProfilePageLink: React.FC<ProfilePageLinkProps> = ({
    courseOwner_id,
    courseOwner_username
}) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/user/${courseOwner_id}`)
    }

    return ( 
        <div>
             <h1 className="flex justify-between font-medium text-base mb-2">
              erstellt von : <button className="mr-auto ml-2" onClick={onClick}><p className="mr-auto ml-2 text-blue-800 font-bold"> {courseOwner_username} </p> </button>
            </h1>
        </div>
     );
}
 
export default ProfilePageLink;