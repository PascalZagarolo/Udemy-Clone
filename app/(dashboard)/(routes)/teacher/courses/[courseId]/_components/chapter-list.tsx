'use client';

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
    items : Chapter[];
    onReorder: (updateData : {id : string, position : number}[]) => void;
    onEdit : (id : string) => void;
    
}

const ChaptersList: React.FC<ChaptersListProps> = ({
    items,
    onReorder,
    onEdit
}) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    })

    useEffect(() => {
        setChapters(items);
    },[items])

    //chapters bleiben (Client-Side) an gedroppter Stelle.
    const onDragEnd = (result : DropResult) => {
        if(!result.destination) {
            return
        }

        const items = Array.from(chapters);

        const [reorderdItem] = items.splice(result.source.index,1);
        items.splice(result.destination.index, 0, reorderdItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex , endIndex + 1)

        setChapters(items);

        const bulkUpdateData = updatedChapters.map((chapter, index) => ({
            id : chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)
        }))

        onReorder(bulkUpdateData);
    }

    if(!isMounted) {
        return null;
    }

    return ( 
        
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter,index)=>(
                            <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                {(provided) => (
                                    <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                    chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                    )}
                                    ref = {provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                        <div className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                        chapter.isPublished && " border-r-sky-200 hover:bg-sky-300"
                                        )}
                                        {...provided.dragHandleProps}
                                        >
                                            <Grip className="h-4 w-4" />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-20">
                                            {chapter.isFree && (
                                                <Badge >
                                                    Kostenlos
                                                </Badge>
                                            )}
                                            <Badge className={cn("bg-slate-500", chapter.isPublished && "bg-sky-700")}>
                                                {chapter.isPublished ? "Öffentlich" : "Privat"}
                                            </Badge>
                                            <Pencil 
                                            className="h-4 w-4 cursor-pointer hover:text-sky-700"
                                            onClick={() => onEdit(chapter.id)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
     );
}
 
export default ChaptersList;