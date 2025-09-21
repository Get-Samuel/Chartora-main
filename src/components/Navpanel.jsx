import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { RiChatNewLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import ChartoraLogo from '/Chartora-Logo-Horizontal.svg';

function Navpanel ({setOpened, navOpened}) {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        navOpened(true)
        
        // Trigger content disappear animation
        const buttonDiv = document.querySelector('.button-div');
        if (buttonDiv) {
            buttonDiv.classList.remove('animate-content-appear');
            buttonDiv.classList.add('animate-content-disappear');
        }

        // Trigger sidebar collapse animation
        const sidebar = document.querySelector('.sidebar-container');
        if (sidebar) {
            sidebar.classList.remove('expand-width');
            sidebar.classList.add('collapse-width');
        }

        // Close after animation completes
        setTimeout(() => {
            setOpened();
            setIsClosing(false);
        }, 500);
    };

    return(
    <>
        <div className="flex flex-col bg-backdrop rounded-2xl gap-2 md:max-w-[24%] w-[100vw] h-[100%] p-2 md:p-4 sidebar-container expand-width md:border-1 border-stroke transition-colors duration-500 ease-in-out">

            <div className="flex w-full items-center">
                <img src={ChartoraLogo} className="pl-4 md:w-[45%] w-[35%]"/>
                <button onClick={handleClose} className="p-3 ml-auto rounded-xl bg-lightbg cursor-pointer text-primary md:text-xl text-2xl">
                    <TbLayoutSidebarRightExpand />
                </button>
            </div>

            <ul className="w-full flex flex-col rounded-2xl overflow-y-auto project-container space-y-2 flex-1 h-full text-primary transition-all duration-300 ease-in-out">
                <li className="flex flex-row justify-between pl-3 border-1 border-transparent hover:border-stroke items-center p-2 rounded-2xl cursor-pointer hover:bg-hightlight transition-all duration-200 ease-in-out bg-light">
                    <input
                        placeholder="Untitled Project" 
                        spellCheck={false}
                        className="flex-1 text-hue cursor-pointer outline-0 border-0" 
                        type="text" 
                        defaultValue="Sample Project"
                    />
                    <button className="text-xl text-red-500 p-2 rounded-xl hover:bg-[#ae00002e] ml-auto cursor-pointer active:scale-80 transition-all duration-300 ease-in-out">
                        <FaRegTrashCan />
                    </button>
                </li>
            </ul>

            <div className="button-div opacity-0 flex flex-col gap-2 mb-1 animate-content-appear">
                <button className="w-full flex flex-row justify-center items-center gap-2 bg-primary p-3 rounded-2xl cursor-pointer active:scale-99 transition-all duration-300 text-white">New chat <RiChatNewLine/></button>
            </div>

        </div>
    </>
    );
}

export default Navpanel;