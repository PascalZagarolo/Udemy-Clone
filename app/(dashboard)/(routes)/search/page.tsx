


import { db } from "@/lib/db";

import { getCourses } from "@/actions/get-courses";
import SearchInput from "@/components/search-input";
import Categories from "./_components/categories";
import CoursesList from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server";




interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  let { userId } = auth();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  if(!userId) {
   userId = "user_2Wfz7FQAUdTyJToQl3SU4Qi7zwx"
  }

  const courses = await getCourses({
    userId,
    categoryId: searchParams.categoryId,
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