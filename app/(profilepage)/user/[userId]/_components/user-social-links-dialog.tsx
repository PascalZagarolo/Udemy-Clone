'use client';


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";




import { Instagram, MailCheck, Settings, Share, Twitter, Youtube } from "lucide-react";


const UserSocialDialog = () => {
    return ( 
        <div>
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

                    <div>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default UserSocialDialog;