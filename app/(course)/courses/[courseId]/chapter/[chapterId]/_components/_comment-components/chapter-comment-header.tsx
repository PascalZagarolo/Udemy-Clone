
'use client';

import { Button } from "@/components/ui/button";
import { ComboboxComment } from "@/components/ui/combobox-comment";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Comments } from "@prisma/client";
import { MessagesSquareIcon } from "lucide-react";
import { Combo } from "next/font/google";
import { useParams, usePathname, useRouter } from "next/navigation";
import ChapterCommentInput from "./chapter-comment-input";
import ChapterCommentBox from "./chapter-comment-box";
import { changeCommentFilter, getCommentFilter } from "@/actions/change-comment-filter";
import ChapterFilterBox from "./chapter-comment-filterbox";
import { useEffect } from "react";
import qs from "query-string";




interface CommentHeaderProps {
  comments: Comments[];
  courseId: string;
  chapterId: string

}

let filterOption = getCommentFilter();






const CommentHeader: React.FC<CommentHeaderProps> = ({
  comments,
  courseId,
  chapterId,

}) => {

  const pathname = usePathname();
  const router = useRouter();

  const onChange = (value : string) => {
    console.log(value)
    console.log(pathname)
      const url = qs.stringifyUrl({
          url: pathname,
          query: {
              commentFilter : value
          }
      }, { skipNull: true, skipEmptyString: true });
      
      router.push(url);

  }

  
  
  return (
    <div>
      
      <div className="mt-4">
        <Separator className="h-0.5 w-full bg-blue-800/40 mb-4" />
  
        <ChapterCommentInput
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
      <div>
        <ChapterFilterBox 
        comments={comments}
        onChange={onChange}
        />
      </div>
      <div>
      {comments.length > 0 && (
                <ChapterCommentBox
                commentArray = {comments}
                commentFilter = {filterOption}
        />
             
            )}

      </div>
      
    </div>
  );
}

export default CommentHeader;