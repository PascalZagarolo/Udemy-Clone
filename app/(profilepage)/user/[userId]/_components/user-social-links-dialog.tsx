'use client';


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
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

    const formSchema = z.object({
        instagram: z.string().min(3, {
            message: "Username ist zu kurz"
        }),
        twitter: z.string().min(3, {
            message: "Username ist zu kurz",
            
        }),
        youtube: z.string().min(1, {
            message: "Username ist zu kurz"
        }),
        email: z.string().min(1, {
            message: "Username ist zu kurz"
        }),
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

    const [instaEnabled, setInstaEnabled] = useState(false);
    const [twitterEnabled, setTwitterEnabled] = useState(false);
    const [youtubeEnabled, setYoutubeEnabled] = useState(false);
    const [emailEnabled, setEmailEnabled] = useState(false);

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        
        console.log(values);
    }

    const onInstaChange = () => {
        setInstaEnabled(instaEnabled);
        console.log("Insta : " , instaEnabled);
    }

    const onTwitterChange = () => {
        setTwitterEnabled(!twitterEnabled);
        console.log("Twitter : " , twitterEnabled);
    }

    const onYoutubeChange = () => {
        setYoutubeEnabled(!youtubeEnabled);
        console.log("YouTube : " , youtubeEnabled);
    }

    const onEmailChange = () => {
        setEmailEnabled(!emailEnabled);
        console.log("Email : " , emailEnabled)
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
                                disabled={!instaEnabled}
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Instagram className="w-4 h-4" />
                                            <div className="flex justify-start items-center"> Instagram
                                                <div className="ml-auto mb-2">
                                                    <Switch className="ml-auto w-4 h-4" onCheckedChange={onInstaChange} />
                                                </div>
                                            </div>
                                        </FormLabel>
                                            {instaEnabled && (
                                                <div className="w-full">
                                                    <div className="flex justify-start items-center w-full">                                        
                                                        <p className="mr-2 font-semibold text-sm text-gray-800/80"> instagram.com/</p>
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
                                    disabled={!twitterEnabled}
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
                                                <div>
                                                    <FormControl>
                                                        <Input
                                                            disabled={isSubmitting || !twitterEnabled}
                                                            placeholder="zum Beispiel : @username"
                                                            {...field} 
                                                            readOnly = {twitterEnabled}/>
                                                    </FormControl>
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>

                            <div className="mt-4">
                                <FormField
                                    disabled={!youtubeEnabled}
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
                                                <div>
                                                    <FormControl>
                                                        <Input
                                                            disabled={!youtubeEnabled}
                                                            placeholder="zum Beispiel : @username"
                                                            {...field} />
                                                    </FormControl>
                                                </div>
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
                                        
                                        disabled={!emailEnabled}
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
                                                                disabled={isSubmitting || !emailEnabled}
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

                            <Button className="bg-blue-800 mt-2" type="submit" disabled={isSubmitting}>
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