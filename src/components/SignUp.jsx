import GoogleLogo from '/Google-logo.svg';
import ChartoraLogo from '/Chartora-Logo-Horizontal.svg'; 
import { HiOutlineMail } from "react-icons/hi";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { LuLockKeyhole } from "react-icons/lu";
import { MdAccountBox } from "react-icons/md";

function SignUp ({access}) {

    const logIn =  () => {
            access(true);
    }; 

    return (

        <>

            <div className="flex flex-col items-center gap-3 w-[30vw]">
                <div className="flex place-content-center mb-[2vh]">
                    <img src={ChartoraLogo} className="w-[60%]" alt="" />
                </div>

                <div className="flex text-hue flex-col gap-4 items-center w-full">
                    <p className="w-full font-normal text-center">Create an account to Sign Up</p>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="p-4 border-1 flex flex-row flex-nowrap gap-4 rounded-md items-center border-stroke text-strokethick"><MdAccountBox className="text-xl"></MdAccountBox><input className="flex-1 text-hue min-w-0 outline-0" type="text" placeholder="Full Name"/></div>
                        <div className="p-4 border-1 flex flex-row flex-nowrap gap-4 rounded-md items-center border-stroke text-strokethick"> <HiOutlineMail className="text-xl"/><input placeholder="Email" className="flex-1 min-w-0 text-hue outline-0" type="email" name="" id="" /></div>
                        <div className="p-4 border-1 flex flex-row flex-nowrap gap-4 rounded-md items-center border-stroke text-strokethick"><LuLockKeyhole className="text-xl"/><input type="password" placeholder="Password" className="flex-1 min-w-0 text-hue outline-0" /></div>
                    </div>
                    
                    <button className="py-4 text-white px-6 rounded-md w-full bg-primary cursor-pointer flex flex-row flex-nowrap justify-center items-center gap-2 active:scale-98 transition-all duration-300">
                        <p>Create account</p> <RiAccountPinBoxFill className="text-xl"/>
                    </button>
                </div>

                <div className="bg-red-300 border-t-1 border-stroke my-3 w-full relative">
                    <p className="p-2 text-xs bg-white absolute top-[50%] text-strokethick -translate-y-[50%] left-[50%] -translate-x-[50%]">OR</p>
                </div>

                <button className="py-4 px-6 rounded-md w-full bg-primary cursor-pointer flex flex-row items-center justify-center flex-nowrap gap-2 active:scale-98 transition-all duration-300">
                    <img 
                        src={GoogleLogo} 
                        alt="Google G Logo" 
                        width={24} 
                        height={24}
                    />
                    <p className="text-white">Sign Up with Google</p>
                </button>

                <p>Have an account? <a className="cursor-pointer text-primary" onClick={logIn}>log in here</a></p>
            </div>
        </>
    )
}

export default SignUp;