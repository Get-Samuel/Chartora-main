import GoogleLogo from '/Google-logo.svg';
import ChartoraLogo from '/Chartora-Logo-Horizontal.svg'; 
import { HiOutlineMail } from "react-icons/hi";
import { LuLockKeyhole } from "react-icons/lu";
import { MdLogin } from "react-icons/md";

function SignIn ({access}) {

    const SignUp = () => {
        access(false);
    }

    return(
        <>
            <div className="flex flex-col items-center gap-8 w-[30vw]">
                <div className="flex place-content-center mb-[2vh]">
                                    <img src={ChartoraLogo} className="w-[60%]" alt="" />
                </div>

                <div>
                    <p>Choose a method to Sign-In into your account</p>
                </div>

                <button className="py-4 px-6 text-white rounded-md w-full bg-primary cursor-pointer flex flex-row items-center justify-center flex-nowrap gap-2 active:scale-98 transition-all duration-300">
                    <img 
                        src={GoogleLogo} 
                        alt="Google G Logo" 
                        width={24} 
                        height={24}
                    />
                    <p>Log In with Google</p>
                </button>

                <div className="bg-red-300 border-t-1 border-stroke my-2 w-full relative">
                    <p className="p-2 text-xs bg-white absolute top-[50%] text-strokethick -translate-y-[50%] left-[50%] -translate-x-[50%]">OR</p>
                </div>

                <div className="flex flex-col gap-3 w-full text-primary">
                    <div className="p-4 border-1 flex flex-row flex-nowrap gap-4 rounded-md items-center border-stroke text-strokethick"> <HiOutlineMail className="text-xl"/><input placeholder="Email" className="flex-1 text-hue min-w-0 outline-0" type="email" name="" id="" /></div>
                    <div className="p-4 border-1 flex flex-row flex-nowrap gap-4 rounded-md items-center border-stroke text-strokethick"><LuLockKeyhole className="text-xl"/><input type="password" placeholder="Password" className="flex-1 text-hue min-w-0 outline-0" /></div>
                </div>

                <button className="py-4 px-6 text-white rounded-md w-full bg-primary cursor-pointer flex flex-row items-center justify-center flex-nowrap gap-2 active:scale-98 transition-all duration-300">
                    <p>Sign In</p><MdLogin className='text-xl'/>
                </button>

                <p>Don't have an account? <a className="cursor-pointer text-primary" onClick={SignUp}>Sign up here</a></p>
            </div>
        </>
    );
}

export default SignIn;