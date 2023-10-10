import NavBarRoutes from "@/components/navbar-routes";
import MobileSideBar from "./MobileSideBar";



const NavBar = () => {
    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSideBar />
            <NavBarRoutes />
        </div>
     );
}
 
export default NavBar;