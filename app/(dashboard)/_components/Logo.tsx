import Image from "next/image";

const Logo = () => {
    return ( 
        <div>
            <Image 
                height={150}
                width={150}
                alt="logo"
                src="logo.svg"
            />
        </div>
     );
}
 
export default Logo;