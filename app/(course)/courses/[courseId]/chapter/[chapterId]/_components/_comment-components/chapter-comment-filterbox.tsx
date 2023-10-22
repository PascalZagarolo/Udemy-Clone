'use client';

import { changeCommentFilter, getCommentFilter } from "@/actions/change-comment-filter";
import { ComboboxComment } from "@/components/ui/combobox-comment";
import { Separator } from "@/components/ui/separator";
import { Comments } from "@prisma/client";
import { MessagesSquareIcon } from "lucide-react";
import { comment } from 'postcss';
import { useEffect } from "react";

interface ChapterFilterBoxProps {
    comments : Comments[]
}

const ChapterFilterBox: React.FC<ChapterFilterBoxProps> = ({
    comments
}) => {

    const onChange = (value: string) => {
        changeCommentFilter(value)
        console.log("der neue Filter ist", getCommentFilter())
      }

      let filterType;

      useEffect(() => {
        filterType = getCommentFilter();
      },[onChange])

    return (
        <div>
            <div className="mt-8 w-full flex justify-between">
                <MessagesSquareIcon className="h-6 w-6 mt-2" />
                <div className="text-xl font-semibold mt-2 ml-4">
                    {comments.length} Kommentare
                </div>
                <div className="ml-auto">
                    <ComboboxComment onChange={onChange} />
                </div>
                <div className="justify-between flex flex-row">
                    <Separator className="h-4 w-4 text-slate-800" />
                </div>
                <Separator className="h-4 w-4" />
            </div>
            
        </div>
    );
}

export default ChapterFilterBox;