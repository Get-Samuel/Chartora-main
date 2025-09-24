import { FaRegTrashCan } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function FileUpload () {
    return(
        <>
            <div className="flex gap-2 filePreviewAppear border-1 border-stroke w-full md:p-3 md:pr-8 p-2 bg-hightlight justify-between rounded-3xl">
                <div className="flex-1 rounded-full p-2  px-4 text-sm text-hue flex flex-row gap-1 items-center font-bold">Assembly_Survey</div>
                <div className="md:flex w-fit rounded-full p-2  px-4 text-sm text-hue hidden flex-row gap-1 items-center font-bold">19KB</div>
                <div className="md:flex w-fit rounded-full p-2  px-4 text-sm text-hue hidden flex-row gap-1 items-center font-bold">PDF</div>
                <div className="flex md:absolute right-0 -top-2 text-white text-xl cursor-pointer md:p-1 p-2 rounded-full bg-inputbg border-1 border-stroke active:scale-90 animation-all duration-300"><IoClose/></div>
            </div>
        </>
    )
}

export default FileUpload;