'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface ConfirmModalProps {
    children : React.ReactNode;
    onConfirm : () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    children,
    onConfirm
}) => {
    return (
        <>
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Bist du sicher?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Gelöschte Komponenten können nicht wiederhergestellt werden.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Abbrechen
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Bestätigen
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
     );
}
 
export default ConfirmModal;