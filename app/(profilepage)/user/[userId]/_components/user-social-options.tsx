import { Button } from "@/components/ui/button";


interface SocialOptionsProps {
    icon : any
}


const SocialOptions: React.FC<SocialOptionsProps> = ({
    icon : Icon
}) => {
    return ( 
        <div>
            <div className="mr-8 items-center">
                <Button variant="ghost">
                        <Icon />
                </Button>
            </div>
        </div>
     );
}
 
export default SocialOptions;