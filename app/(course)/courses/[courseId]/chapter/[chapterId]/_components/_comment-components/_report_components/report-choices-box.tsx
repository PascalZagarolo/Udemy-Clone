'use client';

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";



interface ReportChoicesBoxProps {
    key: string,
    value: string
}

const ReportChoicesBox: React.FC<ReportChoicesBoxProps> = ({
    key,
    value
}) => {
    return ( 
        <div className="mt-4 flex justify-between items-center">
            <RadioGroupItem value={value} key={key} id={key} className="w-4 h-4">
                
            </RadioGroupItem>
            <div>
            <Label>{value}</Label>
            </div>
        </div>
    );
}

export default ReportChoicesBox;