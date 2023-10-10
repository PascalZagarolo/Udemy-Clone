import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 

const handleAuth = () => {
    const { userId } = auth();
    if(!userId) throw new Error("Nicht autorisiert");
    return { userId }
}


 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage : f({ image : { maxFileSize : "4MB", maxFileCount : 1} })
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
  courseAttechment: f(["text", "image", "video", "pdf", "audio"])
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
  chapterVideo: f({ video : { maxFileSize : "64GB" , maxFileCount : 1}})
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;