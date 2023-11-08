import UserCourses from "./user-courses";
import UserDescription from "./user-description";

const UserMainContent = () => {
    return ( 
        <div className="mt-4">
            <UserDescription/>
            <UserCourses/>
        </div>
     );
}
 
export default UserMainContent;