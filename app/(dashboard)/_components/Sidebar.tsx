import { getUserProfile } from "@/actions/get-userprofile";
import Logo from "./Logo";
import SideBarRoutes from "./SideBarRoutes";

interface SideBarProps {
    createdProfile : boolean;
}


const SideBar: React.FC<SideBarProps> = async ({
    createdProfile
}) => {
    
    const { name , username } = createdProfile ? await getUserProfile() : { name: "", username: "" };

    
        
    
    
    return (
        <div> 
        <div className="h-full border-r flex flex-col  overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex w-full">
                <SideBarRoutes 
                name = {name}
                username={username}
                />
            </div>
        </div>
        </div>
     );
}
 
export default SideBar;