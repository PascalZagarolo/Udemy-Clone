import { Facebook, Instagram, Layers, Mail, MailsIcon, Youtube } from "lucide-react";


const UserFooter = () => {
    return ( 
        <div>
            <div className="justify-between flex">
                <div>
                    <MailsIcon />
                </div>
                <div>
                    <Layers />
                </div>
                <div>
                    <Facebook/>
                </div>
                <div>
                    <Instagram/>
                </div>
                <div className="mr-64">
                    <Youtube/>
                </div>
            </div>
        </div>
     );
}
 
export default UserFooter;