import { db } from "@/lib/db";
import { Instagram, Link, Link2, LinkIcon, Mail, Twitter, Youtube } from "lucide-react";
import SocialOptions from "./user-social-options";
import { Separator } from "@/components/ui/separator";


interface SocialDisplayProps {
    userId: string
}

const SocialDisplay: React.FC<SocialDisplayProps> = async ({
    userId
}) => {

    const socialLogo: Record<string, any> = {
        "instagram": Instagram,
        "twitter": Twitter,
        "youtube": Youtube,
        "email": Mail
    }

    const sharedSocials = await db.socialLinks.findMany({
        where: {
            linksId: userId,
            enabled: true
        }
    })


    return (
        <div className="mt-8 md:mb-4 sm:mb-4  mb-4">
            {sharedSocials.length > 0 && (
                <div>
                    <div>
                        <h3 className="flex justify-start items-center">
                            <LinkIcon className="mr-2" />
                            <p className="font-semibold text-xl">
                                Relevante Links
                            </p>
                        </h3>
                        <div className="mt-4">
                            <Separator
                                className="bg-black w-8"
                            />
                        </div>
                    </div>
                    <div className="flex justify-start mt-4">

                        {
                            sharedSocials.map((social, index) => (
                                <SocialOptions
                                    key={index}
                                    icon={socialLogo[sharedSocials[index].linkType]}
                                    username={sharedSocials[index].username}
                                />
                            ))
                        }

                    </div>
                </div>
            )}

        </div>
    );
}

export default SocialDisplay;