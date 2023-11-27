'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { auth } from "@clerk/nextjs";
import axios from "axios";


import { Star, StarHalf } from "lucide-react";
import { useParams } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface RatingDialogProps {
    userId : string;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
    userId
}) => {

    

    const starWrapper = document.querySelector(".stars");
    const stars = document.querySelector(".stars a");

    const [rating, setRating] = useState<number>();

    const params = useParams();

    const onClick = () => {

        try {
            axios.patch(`/api/courses/${params.courseId}/user/${userId}/rating`, rating );
            toast.success("Bewertung erfolgreich abgegeben!");
        } catch {
            toast.error("Etwas ist schief gelaufen :/ ");
        }
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="ghost">
                    <Star className="h-4 w-4 mr-2" />
                    Kurs bewerten
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-start">
                        <StarHalf className="text-yellow-400" />
                        Gebe diesem Kurs eine Bewertung!
                    </DialogTitle>
                    <p className="text-gray-800/80 text-sm"> Bewertungen sind für den Kurs-Ersteller sichtbar.</p>
                </DialogHeader>
                <div>
                    <div>
                        <div className="stars text-2xl">
                            <a type="star"><button type="button" onClick={() => { setRating(1) }}>⭐</button></a>
                            <a type="star"><button type="button" onClick={() => { setRating(2) }}>⭐</button></a>
                            <a type="star"><button type="button" onClick={() => { setRating(3) }}>⭐</button></a>
                            <a type="star"><button type="button" onClick={() => { setRating(4) }}>⭐</button></a>
                            <a type="star"><button type="button" onClick={() => { setRating(5)}}>⭐</button></a>
                        </div>
                        {rating ? (
                            <p className="text-sm mt-2 flex justify-start font-semibold"> {rating}  
                            
                            {rating === 1 ? (
                                <p className="ml-1 mr-1"> Stern </p>
                            ) : (
                                <p className="ml-1 mr-1"> Sterne </p>
                            )}

                             vergeben </p>
                        ) : (
                            <p className="text-gray-800/50 text-sm mt-2"> Noch keine Bewertung abgegeben.</p>
                        )}

                    </div>
                </div>
                <DialogFooter>
                    <DialogTrigger>
                        <Button className="bg-blue-800" disabled={!rating} onClick={onClick}>
                            Bewertung abschicken
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default RatingDialog;


