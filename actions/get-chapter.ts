import { db } from '@/lib/db';
import { Chapter, Course, Attachment } from '@prisma/client';
interface getChapterProps {
    userId: string;
    courseId: string;
    chapterId: string
};

export const getChapter = async ({
    userId,
    courseId,
    chapterId
}: getChapterProps) => {

    try {

        const purchase = await db.purchase.findUnique({
            where: {
              userId_courseId: {
                userId: userId,
                courseId: courseId,
              }
            }
        });

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true
            }, select: {
                price: true
            }
        })

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true
            }
        })

        if(!chapter || !course) {
            throw new Error("Kein Kurs / Kein Kapitel gefunden.")
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        if (purchase) {
            attachments = await db.attachment.findMany({
              where: {
                courseId: courseId
              }
            });
          }
      
          if (chapter.isFree || purchase) {
            muxData = await db.muxData.findUnique({
              where: {
                chapterId: chapterId,
              }
            });
      
            nextChapter = await db.chapter.findFirst({
              where: {
                courseId: courseId,
                isPublished: true,
                position: {
                  gt: chapter?.position,
                }
              },
              orderBy: {
                position: "asc",
              }
            });
          }

        const userProgress = await db.userProgress.findUnique({
            where : {
                userId_chapterId : {
                    userId : userId,
                    chapterId : chapterId
                }
            }
        });

        return { chapter, course, muxData, attachments, nextChapter, userProgress, purchase }
    }
    
     catch (error) {
        console.log("Fehler in getChapter", error)
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null,
        }
    }
}