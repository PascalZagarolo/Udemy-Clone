

const AuthLayout = ({
    children
}: { children : React.ReactNode}) => {
    return (
        
        <div className="bg-gray-300 h-full justify-center flex items-center">
            {children}
            
        </div>

    
     );
}
 
export default AuthLayout;