'use client';

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";



interface FileUploadProps {
    onChange : (url? : string) => void;
    endpoint : keyof typeof ourFileRouter;
}

const FileUpload : React.FC<FileUploadProps> = ({
    onChange,
    endpoint
}) => {
    return ( 
        <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete = {(res) => {onChange(res?.[0].url), toast.success("Datei hochgeladen")}}
        onUploadError =  {(error : Error) => toast.error("Etwas ist schiefgelaufen...") }
        />
     );
}
 
export default FileUpload;