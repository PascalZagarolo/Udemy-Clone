import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";


interface SocialOptionsProps {
    icon: any
    username: string
}


const SocialOptions: React.FC<SocialOptionsProps> = ({
    icon: Icon,
    username
}) => {
    return (
        <div className="relative">
            <div>
                <div className="mr-8 items-center">
                    <Button variant="ghost" className="items-center">
                        <Icon />
                    </Button>
                    <div>
                        {Icon === Mail ? (
                            <p className="text-sm font-bold mr-2 items-center">
                                {username}
                            </p>
                        ) :
                            (
                                <p className="text-sm font-bold mr-2 items-center">
                                    @{username}
                                </p>
                            )}

                    </div>
                </div>

            </div>

        </div>
    );
}

export default SocialOptions;