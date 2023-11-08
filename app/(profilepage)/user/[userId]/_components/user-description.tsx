import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const UserDescription = () => {
    return (
        <div>
            <Alert className="bg-blue-800/60 mt-4 mb-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Platzhalter Titel</AlertTitle>
                <AlertDescription>
                    Platzhalter Text Platzhalter Text Platzhalter Text Platzhalter Text Platzhalter Text
                </AlertDescription>
            </Alert>
            <h3 className="flex text-2xl font-semibold justify-start">
                <p className="text-blue-800">Ü</p>ber mich
            </h3>
        </div>
    );
}

export default UserDescription;