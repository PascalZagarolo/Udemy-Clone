'use client';


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
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
        instagram : z.string().min(3, {
            message : "Username ist zu kurz"
        }),
        twitter : z.string().min(3, {
            message : "Username ist zu kurz"
        }),
        youtube : z.string().min(1, {
            message : "Username ist zu kurz"
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            instagram : "",
            twitter : "",
            youtube : "",
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values : z.infer<typeof formSchema>) => {
        console.log(values);
    }


    return ( 
        <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    
                </form>
            </Form>

            <Dialog>
                <DialogTrigger>
                    <Settings/>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-start items-center">
                            <Share className="text-blue-800"/>
                            <p className="ml-8"> Teile Links zu deinen anderen Websites. </p>
                        </DialogTitle>
                       
                    </DialogHeader>
                    <Label className="text-sm"> Soziale Links : </Label>
                    <Separator className="bg-black w-8 mr-auto"/>
                    <div className="mt-2"> 
                    <div className="flex justify-start items-center">
                        <Switch className="w-4 h-4 mr-4"/>
                        <MailCheck className="w-8 h-8 ml-4 mr-4"/>
                        <p className="mr-2"> Email  </p>
                        <Input placeholder="..." className="ml-4 w-full">
                        </Input>
                    </div>

                    <div className="flex justify-start items-center mt-4">
                        <Switch className="w-4 h-4 mr-4"/>
                        <Instagram className="w-8 h-8 ml-4 mr-4"/>
                        <p className="mr-2"> instagram.com/</p>
                        <Input placeholder="dein Username" className="ml-4 w-full" >
                        </Input>
                    </div>

                    <div className="flex justify-start items-center mt-4">
                        <Switch className="w-4 h-4 mr-4"/>
                        <Twitter className="w-8 h-8 ml-4 mr-4"/>
                        <p className="mr-2"> twitter.com/</p>
                        <Input placeholder="dein Username" className="ml-4 w-full" >
                        </Input>
                    </div>

                    <div className="flex justify-start items-center mt-4">
                        <Switch className="w-4 h-4 mr-4"/>
                        <Youtube className="w-8 h-8 ml-4 mr-4"/>
                        <p className="mr-2"> youtube.com/</p>
                        <Input placeholder="dein Username" className="ml-4 w-full" >
                        </Input>
                    </div>

                    </div>
                    <Label className="text-sm"> Sonstiges : </Label>
                    <Separator className="bg-black w-8 ml-auto"/>
                    <div className="flex items-center justify-center">
                    <p className="mr-auto"><Switch className="w-4 h-4 mr-4"/></p>
                        <Label className="mr-auto"> Deine Website </Label>
                        <Globe/>
                        
                    </div>
                    <div className="flex justify-start items-center mt-4">
                        
                        
                        <Input placeholder="deine Website-URL" className="ml-4 w-full" >
                        </Input>
                    </div>
                    <Separator className="w-8 mr-auto bg-black mt-4"/>
                    <DialogFooter>
                    <Button className="bg-blue-800 hover:bg-blue-800/80">
                        Einstellungen festlegen
                    </Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>



        </div>
     );
}
 
export default UserSocialDialog;