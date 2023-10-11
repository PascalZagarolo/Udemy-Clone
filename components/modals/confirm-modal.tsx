'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    children,
    onConfirm
}) => {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    {children}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Bestätigen
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Bist du sicher, dass du den ausgewählten Kurs löschen möchtest?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel> Abbrechen </AlertDialogCancel>
                        <AlertDialogAction onClick={onConfirm}> Endgültig löschen </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default ConfirmModal;