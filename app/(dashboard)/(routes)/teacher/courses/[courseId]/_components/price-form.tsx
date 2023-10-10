'use client';

import { Course } from "@prisma/client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";



interface PriceFormProps {
    initialData : Course;
}

const formSchema = z.object({
    price : z.coerce.number().multipleOf(0.01)
})

const PriceForm : React.FC<PriceFormProps> = ({
    initialData
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            price : initialData.price || 0
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const toggleEdit = () => {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        console.log(values);
        
        try {
            await axios.patch(`/api/courses/${initialData.id}` , values)
            toast.success("Preis geändert");
            toggleEdit();
            router.refresh()
        } catch {
            toast.error("Fehler beim Speichern")
        }
    }

    const [isEditing, setIsEditing] = useState(false);

    

    const router = useRouter();

    

    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Preis : 
                <Button variant ="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>
                        Abbrechen
                        </>
                    )}
                    { !isEditing && initialData?.price && (
                         <>
                         <PencilLine  className="w-4 h-4 mr-2"/>
                         Preis ändern
                         </>
                    )}

                    { !isEditing && !initialData?.price && (
                         <>
                         <PencilLine  className="w-4 h-4 mr-2"/>
                         Preis hinzufügen
                         </>
                    )}
                    
                </Button>
                
            </div>
            {!isEditing && (
                <p className={cn("text-medium text-sm mt-2",
                !initialData.price && "text-slate-500 italic")}>
                    
                    {initialData.price || "Noch keinen Preis angegeben"}
                    {initialData.price?.toFixed(2) && " € "}
                    
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                        control = {form.control}
                        name="price"
                        render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                    disabled={isSubmitting}
                                    placeholder="Wie teuer soll dein Kurs sein ? "
                                    type="number"
                                    step={0.10}
                                    {...field}
                                    className="font-bold"
                                    /> 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Preis festlegen.
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
     );
}
 
export default PriceForm;