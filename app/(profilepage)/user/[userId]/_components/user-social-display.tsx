import { db } from "@/lib/db";
import { Instagram, Mail, Twitter, Youtube } from "lucide-react";
import SocialOptions from "./user-social-options";

interface SocialDisplayProps {
    userId : string
}

const SocialDisplay: React.FC<SocialDisplayProps> = async ({
    userId
}) => {

    const socialLogo: Record<string, any> = {
        "instagram" : Instagram,
        "twitter" : Twitter,
        "youtube" : Youtube,
        "email" : Mail
    }

    const sharedSocials = await db.socialLinks.findMany({
        where : {
            linksId : userId,
            enabled: true
        }
    })


    return ( 
        <div className="mt-8">
            <div className="flex justify-start">
                {
                    sharedSocials.map((social, index) => (
                        <SocialOptions
                        key={index} 
                        icon={socialLogo[sharedSocials[index].linkType]}
                        username = {sharedSocials[index].username}
                        />
                    ))
                }
            </div>
        </div>
     );
}
 
export default SocialDisplay;