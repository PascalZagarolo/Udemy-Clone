'use client';


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleEllipsis, Globe, Globe2, Instagram, MailCheck, Settings, Share, Twitter, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const UserSocialDialog = () => {

    const formSchema = z.object({
        instagram: z.string().min(3, {
            message: "Username ist zu kurz"
        }),
        twitter: z.string().min(3, {
            message: "Username ist zu kurz"
        }),
        youtube: z.string().min(1, {
            message: "Username ist zu kurz"
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instagram: "",
            twitter: "",
            youtube: "",
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }


    return (
        <div>







            <Dialog>
                <DialogTrigger>
                    <Settings />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-start items-center">
                            <Share className="text-blue-800" />
                            <p className="ml-8"> Teile Links zu deinen anderen Websites. </p>
                        </DialogTitle>
                    </DialogHeader>
                    <Label className="text-sm"> Soziale Links : </Label>
                    <Separator className="bg-black w-8 mr-auto" />

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Instagram className="w-4 h-4" /> 
                                            <div className="flex justify-start items-center"> Instagram  
                                                <div className="ml-auto mb-2"> 
                                                    <Switch className="ml-auto w-4 h-4"/>
                                                </div> 
                                            </div>
                                        </FormLabel>
                                        <div className="flex justify-start items-center">
                                        <p className="mr-2 font-semibold text-sm text-gray-800/80"> instagram.com/</p>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="zum Beispiel : @username"
                                                {...field} />
                                        </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            >
                            </FormField>
                            <div className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="twitter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Twitter className="w-4 h-4" />
                                                <div className="flex justify-start items-center"> Twitter  
                                                <div className="ml-auto mb-2"> 
                                                    <Switch className="ml-auto w-4 h-4"/>
                                                </div> 
                                            </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="zum Beispiel : @username"
                                                    {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>

                            <div className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="youtube"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Youtube className="w-4 h-4" />
                                                <div className="flex justify-start items-center"> YouTube  
                                                <div className="ml-auto mb-2"> 
                                                    <Switch className="ml-auto w-4 h-4"/>
                                                </div>
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="zum Beispiel : @username"
                                                    {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>

                            <div className="mt-4">
                                <Separator
                                className="bg-black w-8 ml-auto mb-2"
                                />
                                <Label>
                                    Sonstiges : 
                                </Label>

                                <Separator className="bg-black w-8 mt-2 mb-2"/>
                            </div>

                        </form>
                    </Form>



                </DialogContent>
            </Dialog>



        </div>
    );
}

export default UserSocialDialog;