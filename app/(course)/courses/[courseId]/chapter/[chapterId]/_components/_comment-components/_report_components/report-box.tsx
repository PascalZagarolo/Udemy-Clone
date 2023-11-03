'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ReportToolTip from "../../report-tooltip";
import { useState } from "react";
import ReportChoicesBox from "./report-choices-box";
import { RadioGroup } from "@/components/ui/radio-group";

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

    return (
        <div>
            <Dialog open={openReport} onOpenChange={() => setOpenReport(!openReport)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <p className="text-base font-medium"> Aus welchem Grund möchtest du diesen
                                <label className="text-blue-800 font-semibold"> Kommentar </label>
                                melden? </p>
                        </DialogTitle>
                    </DialogHeader>
                    <RadioGroup>
                    
                    {Object.entries(reportChoices).map(([key, value]) => (
                        <ReportChoicesBox 
                        key = {key}
                        value = {value}
                        />
                    ))}
                    
                    </RadioGroup>
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