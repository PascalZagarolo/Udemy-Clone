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

    

    

    const [rating, setRating] = useState<number>(0);
    const [hover, setHoverRating] = useState<number>(0); 

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
                        <div className="flex justify-start text-2xl">
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return(
                                    <label>
                                        <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        className="hidden"
                                        onMouseEnter={() => setHoverRating(ratingValue)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        />
                                            {ratingValue <= rating ? (
                                                <p className="hover:cursor-pointer">⭐</p>
                                            ) : (
                                                <p className="hover:cursor-pointer opacity-30 hover:opacity-60">⭐</p>
                                                ) 
                                            }
                                    </label>
                                )
                            })}
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


