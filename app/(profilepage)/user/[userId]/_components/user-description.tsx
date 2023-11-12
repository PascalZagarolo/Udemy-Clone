'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PencilIcon, Terminal } from "lucide-react";
import UserInformation from "./user-information";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface UserDescriptionProps {
    isOwnSite : boolean;
}

const UserDescription: React.FC<UserDescriptionProps> = ({
    isOwnSite
}) => {

    const [isEditing, setIsEditing] = useState(false);

    const onClick = () => {
        setIsEditing(!isEditing)
        console.log(isEditing)
    }

    return (
        <div>
            <h3 className="flex text-2xl font-semibold justify-start items-center mb-2">
                <p className="text-blue-800">Ü</p>ber mich
                {isOwnSite && (
                    <div>
                        <Button variant="ghost" onClick={onClick}>
                        <PencilIcon className=" h-4 w-4 items-center" />
                        </Button>
                    </div>
                )}
            </h3>
            <Dialog open={isEditing} onOpenChange={onClick}>
                <DialogContent>
                        Testt...
                </DialogContent>
            </Dialog>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
            <div>
                Dieser Nutzer hat noch keinen Text über sich geteilt.
            </div>
        </div>
    );
}

export default UserDescription;