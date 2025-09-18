import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { RiChatNewLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";

function Navpanel ({setOpened, navOpened}) {
    return(
    <>
        <div className="flex flex-col bg-backdrop gap-2 md:max-w-[24%] w-[100vw] h-[100%] p-2 md:p-4 sidebar-container rounded-xl expand-width md:border-1 border-stroke transition-colors duration-500 ease-in-out">
            <div className="flex w-full items-center">
                <p className="text-hue ml-4 self-center font-bold opacity-65 px-3 text-center w-fit rounded-2xl text-[12px]">Projects</p>
                <button onClick={() => setOpened()} className="p-3 ml-auto rounded-xl bg-lightbg cursor-pointer text-primary md:text-xl text-2xl">
                    <TbLayoutSidebarRightExpand />
                </button>
            </div>

            <ul className="w-full flex flex-col rounded-2xl overflow-y-auto project-container space-y-2 flex-1 h-full text-primary transition-all duration-300 ease-in-out">
                <li className="flex flex-row justify-between pl-3 items-center p-2 rounded-xl cursor-pointer hover:bg-hightlight transition-all duration-200 ease-in-out bg-light">
                    <input
                        placeholder="Untitled Project" 
                        spellCheck={false}
                        className="flex-1 text-hue cursor-pointer outline-0 border-0" 
                        type="text" 
                        defaultValue="Sample Project"
                    />
                    <button className="text-xl text-red-500 p-2 rounded-xl hover:bg-stroke ml-auto cursor-pointer active:scale-80 transition-all duration-300 ease-in-out">
                        <FaRegTrashCan />
                    </button>
                </li>
            </ul>

            <div className="button-div opacity-0 mb-4 animate-content-appear">
                <button className="w-full flex flex-row justify-center items-center gap-2 bg-primary p-3 rounded-md cursor-pointer active:scale-99 transition-all duration-300 text-white dark:text-black">New chat <RiChatNewLine/></button>
            </div>

        </div>
    </>
    );
}

export default Navpanel;