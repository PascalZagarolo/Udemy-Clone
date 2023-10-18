import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File, MessagesSquareIcon, MinusIcon } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";

import { Separator } from "@/components/ui/separator";

import VideoPlayer from "./_components/video-player-component";
import Banner from "@/components/banner";
import CourseProgressButton from "./_components/course-progress-button";

import CourseEnrollButton from "./_components/course-enroll-button";
import { Preview } from "@/components/preview";
import ChapterCommentInput from "./_components/_comment-components/chapter-comment-input";
import ChapterCommentBox from "./_components/_comment-components/chapter-comment-box";
import { db } from "@/lib/db";
import { comment } from "postcss";



const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/");
  } 

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/")
  }


  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;


  const comments = await db.comments.findMany({
    where : {
      chapterId : params.chapterId
    }
  })

  return ( 
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="Du hast dieses Kapitel bereits abgeschlossen."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Du musst diesen Kurs kaufen, um dieses Kapitel freizuschalten."
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
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapter={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          <div>
            <Separator className="h-4 w-4"/>
            <ChapterCommentInput 
            courseId = {params.courseId}
            chapterId={params.chapterId}
            />
            
            <div className="mt-5 w-full">
              <MessagesSquareIcon className="h-6 w-6 mt-2" />
              <div className="text-medium text-semibold mt-2">
                {comments.length} Kommentare
              </div>
              <MinusIcon className="h-6 w-6 mt-2" />
            </div>
            <Separator className="text-gray-900 mb-5"/>
            
            {comments.length > 0 && (
              comments.map((comment) => (
                <ChapterCommentBox
                key={comment.id}
                comment = {comment}
                />
              )) 
            )}
            
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
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