import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth, authMiddleware } from "@clerk/nextjs";
import { EuroIcon, FileUpIcon, Layout, LayoutDashboard, ListChecks, LucideLayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";

import CourseCategoryForm from "./_components/course-category-form";
import PriceForm from "./_components/price-form";
import AttechmentForm from "./_components/attechment-form";
import ChapterForm from "./_components/chapter-form";
import Banner from "@/components/banner";

import CourseAction from "./_components/course-action-form";




const CourseIdPage = async ({
    params
} : { params : { courseId : string}}) => {

    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }


    const course = await db.course.findUnique({
        where : {
            id : params.courseId,
            userId
        }, include : {
            attachments : {
                orderBy : {
                    name : "asc"
                }
            },
            chapters : {
                orderBy : {
                    position : "asc"
                }
            }
        }, 
    })

    const courseCategories = await db.category.findMany({
        orderBy : {
            name  : "asc"
        }
    })

    console.log(courseCategories)

    if (!course) {
        return redirect("/")
    }

    
    
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
        course.chapters.some(chapter => chapter.isFree)
    ]
    
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `( ${completedFields} / ${totalFields} )`;
    const isComplete = requiredFields.every(Boolean);

    return (
        <>
        {!course.isPublished && (
            <Banner label="Dieser Kurs ist noch nicht veröffentlich und nur für dich Sichtbar."/>
        )}
        <div className="p-6">
            <div className="flex items-center justify-between">
                
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Deinen Kurs gestalten
                    </h1>
                    <span className="text-sm text-slate-700">
                        Vervollständige deine Kursinformationen <p className="font-bold"> {completionText} </p>
                    </span>
                </div>
               
                <CourseAction 
                    disabled={!isComplete}
                    isPublished={course.isPublished}
                    courseId={params.courseId}
                />
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                    <IconBadge variant="default" icon={Layout} />
                        <h2 className="text-xl"> 
                            Bearbeite deinen Kurs
                        </h2>
                    </div>
                    <TitleForm 
                    initialData = {course}
                    />
                    <DescriptionForm 
                    initialData = {course}
                    />
                    <ImageForm 
                    initialData = {course} />
                    
                    <CourseCategoryForm
                    initialData = {course}
                    options = { courseCategories.map((category) => ({
                        label : category.name,
                        value : category.id
                    }))}
                    />
                </div>
                <div>
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                   Kursabschnitte
                            </h2>
                        </div>
                        <ChapterForm 
                        initialData = {course}
                        />
                    </div>
                    <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={EuroIcon} />
                        <h2>
                            Deinen Kurs verkaufen
                        </h2>
                    </div>
                    <PriceForm 
                    initialData={course}
                    />

                    <div className="flex items-center gap-x-2">
                            <IconBadge icon={FileUpIcon} />
                            <h2>
                                Lerninhalte
                            </h2>
                        </div>
                        <AttechmentForm
                        initialData={course}
                        />
                    </div>
                </div>
                
            </div>
        </div>
        </>
     );
}
 
export default CourseIdPage;