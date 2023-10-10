import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, EyeIcon, KeyRound, LayoutDashboard, VideoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterForm from "../../_components/chapter-form";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import PublishButton from "./_components/chapter-publish-form";
import ChapterAccessForm from "./_components/chapter-access-form";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";




const CourseIdPage = async ({params} : { params : { courseId : string, chapterId : string}}) => {

    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }

    

    const chapter = await db.chapter.findUnique({
        where : {
            id : params.chapterId,
            courseId : params.courseId
        } , include : {
            muxData : true,
        }
    })

    if (!chapter) {
        return redirect("/");
    }

    

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `( ${completedFields} / ${totalFields} )`
    const isComplete  = requiredFields.every(Boolean);

    return (
        <>
        {!chapter.isPublished && (
            <Banner 
            variant="warning"
            label="Dein Kurs ist noch nicht öffentlich. Und somit für keinen Sichtbar ausser dir selber."
            />
        )} 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link 
                    href={`/teacher/courses/${params.courseId}`}
                    className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft 
                        className="h-4 w-4 mr-2"
                        />

                        Zurück zur Kursübersicht.
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1>
                                Kapitel erstellen
                            </h1>
                            <span>
                                Vervollständige alle Pflichtfelder {completionText}
                            </span>
                        </div>
                        <ChapterActions
                        disabled={!isComplete}
                        courseId = {params.courseId}
                        chapterId = {params.chapterId}
                        isPublished = {chapter.isPublished}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge 
                            icon={LayoutDashboard}
                            />
                            <h2 className="text-xl">
                                Gestalte deine Kapitel
                            </h2>
                        </div>
                        <ChapterTitleForm 
                        initialData={chapter}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                        />
                        <ChapterDescriptionForm 
                        initialData={chapter}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={KeyRound} />
                        <h2 className="text-xl">
                            Sichtbarkeit
                        </h2>
                    </div>
                    <ChapterAccessForm 
                    initialData={chapter}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    />
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={VideoIcon} />
                        <h2>
                        Füge ein Video hinzu
                        </h2>
                    </div>
                    <ChapterVideoForm 
                    initialData={chapter}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    />
                </div>
            </div>
        </div>
        </>
     );
}
 
export default CourseIdPage;