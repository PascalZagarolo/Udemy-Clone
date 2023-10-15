'use client';

import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
    onChange? : (value : string) => void,
    value : string
}

const Preview: React.FC<PreviewProps> = ({
    onChange,
    value
}) => {
    //?prevent ssr
    //!hydration errors -> hello-pangea/dnd
    const reactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr : false }), [])

    return ( 
        <div className="bg-white">
            <ReactQuill theme="bubble" value={value} readOnly/>
        </div>
     );
}
 
export default Preview;