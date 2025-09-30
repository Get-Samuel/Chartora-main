import ChartoraLogo from '/Chartora-AI-Icon.svg';
import { useState } from 'react';

function Tokens () {
    const [request, setRequest] = useState(10);

    return(
        <>
            <div className="p-2 flex rounded-xl flex-row items-center bg-inputbg gap-2 border-1 border-stroke absolute md:top-4 top-[10vh] mx-auto">
                <img src={ChartoraLogo} className="w-4 h-4" alt="" />
                <p className="text-hue md:text-[12px] text-[10px]">You've free access submit {request} request <a className="text-primary cursor-pointer">Learn more</a></p>
            </div>
        </>
    )
}

export default Tokens;