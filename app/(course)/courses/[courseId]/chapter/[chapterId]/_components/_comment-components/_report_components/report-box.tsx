'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ReportToolTip from "../../report-tooltip";
import { useState } from "react";
import ReportChoicesBox from "./report-choices-box";
import { RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ReportBox = () => {

    const [openReport, setOpenReport] = useState(false);

    const reportTrigger = () => {
        setOpenReport(true);
    }

    const reportChoices = {
        "offensive": "Beleidigend",
        "abuse" : "Missbrauch",
        "violation": "Verstoß gegen Richtlinien",
        "inappropriate": "Unangemessener Inhalt"
    }

    const onReport = () => {
        toast.success("Kommentar wurde erfolgreich gemeldet")

        //TO:DO !!!
    }

    return (
        <div>
            <Dialog open={openReport} onOpenChange={() => setOpenReport(!openReport)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <p className="text-medium font-medium mb-2"> Aus welchem Grund möchtest du diesen
                                <label className="text-blue-800 font-semibold"> Kommentar </label>
                                melden? </p>
                        </DialogTitle>
                        <p className="text-gray-700/80 "> Gemeldete Kommentare, werden auf Verletzung der Nutzungsbedingungen überprüft und ggf. gelöscht. </p>
                    </DialogHeader>
                    <Separator className="w-[100px] bg-blue-800 mb-4" />
                    <RadioGroup defaultValue="offensive">
                    
                    {Object.entries(reportChoices).map(([key, value]) => (
                        <ReportChoicesBox 
                        key = {key}
                        value = {value}
                        />
                    ))}
                    
                    </RadioGroup>
                    <Separator className="bg-blue-800 ml-auto w-[100px] mt-4"/>
                    <DialogFooter className="mt-8">
                        <DialogTrigger>
                        <Button className="bg-blue-800 hover:bg-blue-800/60" onClick={onReport}>
                            Kommentar melden
                        </Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Popover>
                <PopoverTrigger>
                    <ReportToolTip
                    />
                </PopoverTrigger>
                <PopoverTrigger className="mb-4" asChild>
                    <button className="rounded-md" onClick={reportTrigger}>
                        <PopoverContent side="top" className="border-r hover:bg-gray-400/50 flex items-center justify-center w-[200px] h-[50px] mb-4 mr-8 ">
                            <label className="font-semibold text-sm">
                                Kommentar melden
                            </label>
                        </PopoverContent>
                    </button>
                </PopoverTrigger>
            </Popover>
        </div>
    );
}

export default ReportBox;