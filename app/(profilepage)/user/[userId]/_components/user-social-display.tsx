import { db } from "@/lib/db";
import { Instagram, Mail, Twitter, Youtube } from "lucide-react";

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

    const sharedSocials = await db.links.findMany({
        where : {
            userId,
            socialLinks : {
                some :{
                    enabled : true
                }
            }
        }
    })


    return ( 
        <div>
            <div>
                
            </div>
        </div>
     );
}
 
export default SocialDisplay;