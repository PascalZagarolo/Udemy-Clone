import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File, MessagesSquareIcon, MinusIcon, Star } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";

import { Separator } from "@/components/ui/separator";

import VideoPlayer from "./_components/video-player-component";
import Banner from "@/components/banner";
import CourseProgressButton from "./_components/course-progress-button";

import CourseEnrollButton from "./_components/course-enroll-button";
import { Preview } from "@/components/preview";
import ChapterCommentInput from "./_components/_comment-components/chapter-comment-input";

import { db } from "@/lib/db";
import { comment } from "postcss";
import { Combobox } from "@/components/ui/combobox";
import { ComboboxComment } from "@/components/ui/combobox-comment";
import CommentHeader from "./_components/_comment-components/chapter-comment-header";
import { useState } from "react";
import CommentSection from "./_components/_comment-components/comment";
import { Comments, User } from "@prisma/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getUser } from "@/actions/get-user";
import { Button } from "@/components/ui/button";
import ProfilePageLink from "./_components/profile-page-link";
import RatingBox from "./_components/_rating-components/rating-course-box";
import RatingDialog from "./_components/_rating-components/rating-course-dialog";
import DisplayRating from "./_components/_rating-display-components/rating-display-main";



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



  type CommentWithUserProfile = Comments & {
    user: User
  }

  const comments: CommentWithUserProfile[] = await db.comments.findMany({
    where: {
      chapterId: params.chapterId
    }, include: {
      user: true
    }, orderBy: {
      createdAt: "desc"
    }
  })



  const courseCreator = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  })

  const courseOwner = await db.user.findUnique({
    where: {
      id: courseCreator?.userId
    }
  })





  return (
    <div>
      {userProgress?.isCompleted && (
        <div className="ml-8 mb-8">
          <Banner
            variant="success"
            label="Du hast dieses Kapitel bereits abgeschlossen."
          />
        </div>
      )}
      {isLocked && (
        <div className="ml-8">
          <Banner
            variant="warning"
            label="Du musst diesen Kurs kaufen, um dieses Kapitel freizuschalten."
          />
        </div>
      )}



        <div className="md:flex md:justify-center lg:flex lg:justify-center">
          
          <div className="">
            
              <DisplayRating courseId={params.courseId}/>
           
    
      </div>
      
      <div className="flex flex-col max-w-4xl mx-auto justify-center mr-auto">
        
        <div className="p-4 w-100">
          
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
        <div className="sm:ml-4">
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between sm:ml-2">
            <h2 className="text-2xl font-semibold w-full ">
              {chapter.title}
            </h2>
            {purchase ? (
              <div className="flex justify-between w-full">
                <div className="mr-8 ml-8">
                <RatingBox/>
                </div>
                
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapter={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              </div>

            ) : (
              <div className="flex justify-between w-full">
                <div className="mr-8 ml-8">
                <Button variant="ghost" disabled >
                    <Star className="h-4 w-4 mr-2" />
                    <p >Kurs bewerten</p>
                </Button>
              </div>
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
              </div>
            )}
          </div>
          <div className="sm:ml-8 sm:mr-4">
            <ProfilePageLink
              courseOwner_username={courseOwner?.username!}
              courseOwner_id={courseOwner?.id!}
              imageUrl={courseOwner?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"}
              creationDate={courseOwner?.createdAt}
            />

            <Separator className="bg-black w-8 mb-4 mt-4" />
            <div>
              <Preview value={chapter.description!} />
            </div>
            <div className="mt-4 sm:ml-4">

              <CommentSection
                comments={comments}
                courseId={params.courseId}
                chapterId={params.chapterId}

              />

            </div>
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
        




      
    </div>
  );
}

export default ChapterIdPage;