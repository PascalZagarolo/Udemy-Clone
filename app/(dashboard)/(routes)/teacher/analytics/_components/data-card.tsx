import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataCardProps {
    value : number,
    label : string,
    shouldFormat? : boolean
}

const formattedPrice = (price : number) => {
const priceStr = price.toLocaleString('de-DE', { minimumFractionDigits: 2 });
  const [wholePart, decimalPart] = priceStr.split(',');
  const formatted = `${wholePart}.${decimalPart} €` ;

  return formatted;
}

const DataCard: React.FC<DataCardProps> = ({
    value,
    label,
    shouldFormat
}) => {
    return ( 
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {shouldFormat ? formattedPrice(value) : value}
                </div>
            </CardContent>
        </Card>
     );
}
 
export default DataCard;