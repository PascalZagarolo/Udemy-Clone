import { Separator } from "@/components/ui/separator";
interface ProgressBarProps {
    length : number,
    starLength : number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    length,
    starLength
}) => {
    return ( 
        <div>
           
            {starLength !== 0  ? (
                <Separator
                className="bg-yellow-400 h-1"
                style={
                    {
                        width : length
                    }
                }
                />
                
            ) : (
                
                
                <Separator 
                className="bg-black h-1 opacity-40 w-6"
                />
                
            )}
            
            
        </div>
     );
}
 
export default ProgressBar;