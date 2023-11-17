import Image from "next/image";

const Logo = () => {
    return ( 
        <div>
            <Image 
                height={150}
                width={150}
                sizes="150px"
                alt="logo"
                src="https://img.logoipsum.com/243.svg"
            />
        </div>
     );
}
 
export default Logo;