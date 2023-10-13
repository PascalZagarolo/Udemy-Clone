import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import VideoPlayer from "./_components/video-player-component";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { FileX2Icon } from "lucide-react";
import CourseProgress from "@/components/course-progress";
import CourseProgressButton from "./_components/course-progress-button";
import axios from "axios";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import toast from "react-hot-toast";

const ChapterIdPage = async ({
    params
}: { params: { courseId: string, chapterId: string } }) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        chapter, course, muxData, attachments, nextChapter, userProgress, purchase,

    } = await getChapter({
        userId: userId,
        chapterId: params.chapterId,
        courseId: params.courseId
    })

    if (!chapter || !course) {
        return redirect("/");
    }

    if (!params.courseId) {
        return redirect("/");
    }

   


    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    



    return (
        <div className="w-full">
            {userProgress?.isCompleted && (
                <Banner
                    variant="success"
                    label="Du hast dieses Kapitel erfolgreich abgeschlossen!"
                />
            )}
            {isLocked && (
                <Banner
                    variant="warning"
                    label="Du hast dieses Kapitel noch nicht erworben."
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mt-2">
                            {chapter.title}
                        </h2>
                        {purchase ? (
                            <div className="mr-10">
                                <CourseProgressButton
                                    chapterId={params.chapterId}
                                    courseId={params.courseId}
                                    nextChapter={nextChapter?.id}
                                    isCompleted={!!userProgress?.isCompleted}
                                />
                            </div>
                        ) : (
                            <CourseEnrollButton
                                courseId={params.courseId}
                                price={course.price!}
                            />
                        )}
                    </div>
                    <Separator />
                    <div>
                        <Preview
                            value={chapter.description!}
                        />
                    </div>
                    {attachments.length > 0 && (
                        <>
                            <Separator />
                            <div className="p-4">
                                {attachments.map((attachment) => (
                                    <a
                                        key={attachment.id}
                                        target="_blank"
                                        href={attachment.url}
                                        className="flex items-center p-3 w-full bg-sky-200
                                border text-sky-700 rounded-md hover:underline"
                                    >
                                        <FileX2Icon />
                                        <p className="line-clamp-1">
                                            {attachment.name}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChapterIdPage;