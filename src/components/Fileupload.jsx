import { FaRegTrashCan } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function FileUpload () {
    return(
        <>
            <div className="flex filePreviewAppear gap-2 border-1 md:w-[60%] border-stroke w-[95%] absolute left-[50%] -translate-x-[50%] md:p-4 md:px-5 p-3 md:h-[18vh] h-[15vh] pl-3 bg-inputbg justify-between items-start rounded-4xl md:bottom-[10vh] bottom-[7vh] overflow-hidden">
                <div className="flex-1 md:bg-hightlight rounded-full p-2  px-4 text-sm text-hue flex flex-row gap-1 items-center">file.name</div>
                <div className="md:flex bg-hightlight w-fit rounded-full p-2  px-4 text-sm text-hue hidden flex-row gap-1 items-center">file.thumbnail</div>
                <div className="md:flex bg-hightlight w-fit rounded-full p-2  px-4 text-sm text-hue hidden flex-row gap-1 items-center">file.thumbnail</div>
                <div className="p-2 px-4 flex flex-row gap-1 items-center rounded-full text-sm bg-[#c20505d6] cursor-pointer active:scale-95 text-white transition-all duration-300">
                    <div className="hidden md:flex flex-row gap-1 items-center text-xs">Delete <FaRegTrashCan/></div> 
                    <div className="flex md:hidden text-2xl"><IoClose/></div>
                </div>
            </div>
        </>
    )
}

export default FileUpload;