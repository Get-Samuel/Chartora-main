import { useState, useEffect, useRef } from "react";
import { db, saveChatToDB } from "../db/ChartoraDB";
import { v4 as uuidv4 } from "uuid";

function Platform ({agent}) {
    //Hide Heading
    const [startChat, setStartChat] = useState(() => {
        const status = localStorage.getItem('start') || 'false';
        return status === 'true';
    });
    
    
    return (
        <>
            <div className="md:w-[60vw] flex flex-col space-y-3 md:bottom-[17vh] overflow-y-auto md:absolute md:left-[50%] md:-translate-x-[50%] mx-auto md:top-[5vh] w-full h-full md:max-h-[80vh] py-[10vh] md:pt-0 transition-all duration-300 ease-in-out">
                <div className="fixed top-[10vh] promptPreviewAppear md:top-[2vh] text-nowrap text-hue bg-accent left-[50%] translate-x-[-50%] p-3 rounded-xl text-[12px]">
                    {`You've got only 5 response`}  <a className="text-primary" href="">learn more</a>
                </div>
                {!startChat &&
                    <>
                    <h1 className="md:text-6xl text-[7vw] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] md:mt-25 mt-[22vh] mx-auto font-bold text-center w-[60%]">Hi there! <br/> I’m Chartora AI.</h1>
                    <span className="md:text-xl text-sm text-center text-hue font-normal">How can I help you with your chart today?</span>
                    </>
                }
                {/* <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Hello bro please help</p>
                <canvas className="w-full h-fit bg-accent rounded-2xl"></canvas>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Yes</p>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Hello bro please help</p>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Hello bro please help</p>
                <canvas className="w-full h-fit bg-accent rounded-2xl"></canvas>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Yes</p>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Hello bro please help</p>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Hello bro please help</p>
                <canvas className="w-full h-fit bg-accent rounded-2xl"></canvas>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Yes</p>
                <p className="p-2 text-hue bg-accent fade-in w-fit rounded-2xl max-w-[60%] transition-all duration-300 ease-in-out">Hello bro please help</p> */}
            </div>
        </>
    );
}

export default Platform;