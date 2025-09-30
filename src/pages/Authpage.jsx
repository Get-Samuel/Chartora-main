import { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function Authpage (){
    const [SignedIn, SetSignedIn] = useState(false);

    return(
        <>
            <div className="p-4 bg-white w-screen h-screen grid place-content-center">
            {SignedIn ? 
                <SignIn access={(e) => {
                    SetSignedIn(e);
                }} /> 

            : 
            
                <SignUp access={(e) => {
                    SetSignedIn(e);
                }}/>
            }
            </div>
        </>
    )
}

export default Authpage;