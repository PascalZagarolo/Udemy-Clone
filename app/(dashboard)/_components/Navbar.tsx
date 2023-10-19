import NavBarRoutes from "@/components/navbar-routes";
import MobileSideBar from "./MobileSideBar";

interface NavBarProps {
    createdProfile : boolean;
}


const NavBar: React.FC<NavBarProps> = ({
    createdProfile
}) => {
    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSideBar createdProfile = { createdProfile } />
            <NavBarRoutes />
        </div>
     );
}
 
export default NavBar;