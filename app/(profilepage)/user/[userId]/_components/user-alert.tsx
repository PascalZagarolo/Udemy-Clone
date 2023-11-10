import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const UserAlert = () => {
    return ( 
        <div>
            <Alert className="bg-blue-800/60 mb-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Platzhalter Titel</AlertTitle>
                <AlertDescription>
                    Platzhalter Text Platzhalter Text Platzhalter Text Platzhalter Text Platzhalter Text
                </AlertDescription>
            </Alert>
        </div>
     );
}
 
export default UserAlert;