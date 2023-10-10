"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({ 
    title: z.string().min(1,{
        message : "Titel ist kurz"
    }),
});

const CreatePage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({ 
        resolver : zodResolver(formSchema),
        defaultValues : {
            title: "",
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses" , values)
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Kurs wurde erfolgreich erstellt")
        } catch {
            toast.error(":/")
        }
    }

    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl"> 
                    Gebe deinem Kurs einen Namen
                </h1>
                <p className="text-sm text-slate-600"> Der Name kann später noch geändert werden.</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        placeholder="Gebe deinem Kurs einen Namen"
                        className="space-y-8 mt-8"
                        
                    >
                        <FormField 
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Titel des Kurses
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isSubmitting}
                                    placeholder="zum Beispiel : Mathematik 1. Klasse"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    liste deine Lerninhalte auf
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button type="button" variant="ghost">
                                    Abbrechen
                                </Button>
                            </Link>
                            <Button type="submit"
                            disabled={!isValid || isSubmitting}
                            >
                                Fortfahren
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CreatePage;