import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/courses-list";

interface SearchPageProps {
    searchParams : {
        title : string,
        categoryId : string
    }
}

const SearchPage: React.FC<SearchPageProps> = async ({
    searchParams
}) => {

    const { userId } = auth();

    const categories = await db.category.findMany({
        orderBy : {
            name : "asc"
        }
    })
    
    

    if(!userId) {
        return redirect("/")
    }

    const courses = await getCourses({ 
        userId : userId,
        ...searchParams
    });

    return (
        <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
            <SearchInput />
        </div>
        <div className="p-6 space-y-4">
            <Categories 
            items={categories}
            />
            
            <CoursesList items={courses} />
        </div>
        </>
     );
}
 
export default SearchPage;