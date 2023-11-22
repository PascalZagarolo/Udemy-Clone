'use client';


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleEllipsis, Globe, Globe2, Instagram, Mail, MailCheck, Settings, Share, Twitter, Youtube } from "lucide-react";
import { on } from "node:events";
import { useState } from "react";
import { useForm } from "react-hook-form";





import { z } from "zod";


const UserSocialDialog = () => {





    const [instaEnabled, setInstaEnabled] = useState(false);
    const [twitterEnabled, setTwitterEnabled] = useState(false);
    const [youtubeEnabled, setYoutubeEnabled] = useState(false);
    const [emailEnabled, setEmailEnabled] = useState(false);




    const formSchema = z.object({
        instagram:
            instaEnabled ? z.string().min(3, {
                message: "Username ist zu kurz"
            }) : z.string().min(3, {
                message: "Username ist zu kurz"
            }).optional(),

        twitter:
            twitterEnabled ? z.string().min(3, {
                message: "Username ist zu kurz",
            }) : z.string().min(3, {
                    message: "Username ist zu kurz",
                }).optional(),



        youtube:
            youtubeEnabled ? z.string().min(1, {
                message: "Username ist zu kurz"
            }) :
                z.string().min(1, {
                    message: "Username ist zu kurz"
                }).optional(),

        email:
            emailEnabled ? z.string().min(1, {
                message: "Username ist zu kurz"
            }) :
                z.string().min(1, {
                    message: "Username ist zu kurz"
                }).optional(),
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instagram: "",
            twitter: "",
            youtube: "",
            email: "",
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: z.infer<typeof formSchema>) => {

        console.log(values);
    }

    const onInstaChange = () => {
        setInstaEnabled(instaEnabled ? false : true);
        console.log("Insta : ", instaEnabled);
    }

    const onTwitterChange = () => {
        setTwitterEnabled(twitterEnabled ? false : true);
        console.log("Twitter : ", twitterEnabled);
    }

    const onYoutubeChange = () => {
        setYoutubeEnabled(youtubeEnabled ? false : true);
        console.log("YouTube : ", youtubeEnabled);
    }

    const onEmailChange = () => {
        setEmailEnabled(emailEnabled ? false : true);
        console.log("Email : ", emailEnabled)
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

                        <Instagram className="w-4 h-4" />
                                            <div className="flex justify-start items-center"> <p className="text-sm font-semibold"> Instagram </p>
                                                <div className="ml-auto mb-2">
                                                    <Switch className="ml-auto w-4 h-4" onClick={onInstaChange} />
                                                </div>
                                            </div>
                        <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                    <FormItem>
                                        
                                        {instaEnabled && (
                                            <div className="w-full">
                                                <div className="flex justify-start items-center w-full">
                                                    <FormControl>
                                                        <Input
                                                            type="instagram"
                                                            placeholder="zum Beispiel : @username"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        )}
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
                                                        <Switch className="ml-auto w-4 h-4" onCheckedChange={onTwitterChange} />
                                                    </div>
                                                </div>
                                            </FormLabel>
                                            {twitterEnabled && (

                                                <FormControl>
                                                    <Input
                                                        
                                                        placeholder="zum Beispiel : @username"
                                                        {...field}
                                                    />
                                                </FormControl>

                                            )}
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
                                                        <Switch className="ml-auto w-4 h-4" onCheckedChange={onYoutubeChange} />
                                                    </div>
                                                </div>
                                            </FormLabel>
                                            {youtubeEnabled && (

                                                <FormControl>
                                                    <Input
                                                        
                                                        placeholder="zum Beispiel : @username"
                                                        {...field} />
                                                </FormControl>

                                            )}

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

                                <Separator className="bg-black w-8 mt-2 mb-2" />
                                <div className="mt-4">
                                    <FormField

                                        
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <Mail className="w-4 h-4" />
                                                    <div className="flex justify-start items-center"> E-Mail Addresse
                                                        <div className="ml-auto mb-2">
                                                            <Switch className="ml-auto w-4 h-4" onCheckedChange={onEmailChange} />
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                {emailEnabled && (
                                                    <div>
                                                        <FormControl>
                                                            <Input
                                                                
                                                                placeholder="zum Beispiel : test@test.com"
                                                                {...field} />
                                                        </FormControl>
                                                    </div>
                                                )}

                                            </FormItem>
                                        )}
                                    >
                                    </FormField>
                                </div>
                                <Separator className="bg-black w-8 mb-2 ml-auto mt-4" />
                            </div>

                            <Button className="bg-blue-800 mt-2" type="submit" disabled={isSubmitting || !isValid}>
                                Einstellungen festlegen
                            </Button>

                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UserSocialDialog;