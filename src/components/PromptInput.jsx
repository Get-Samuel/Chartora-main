import { TbArrowForwardUp } from "react-icons/tb";
import { FiPaperclip } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { useUploadStore, processAndStoreFile } from "../utils/globalFunctions";
import { IoTrashOutline } from "react-icons/io5";
import { generateChartFromFileAndPrompt } from "../services/aiService";

function PromptInput ({agent, filePreview}) {
    const [wake, setWake] = useState(true);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const hiddenInput = useRef(null);
    
    const file = useUploadStore((state) => state.file);
    const setFile = useUploadStore((state) => state.setFile);

    // Simplified state management - no complex session loading needed
    useEffect(() =>{
        if (filePreview) {
            filePreview(wake);
        }
    }, [wake, filePreview]);

    const triggerHiddenInput = () => {
        if (hiddenInput.current) {
            hiddenInput.current.click();
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && agent) {
            processAndStoreFile(selectedFile, agent, setFile);
        }
    };

    const handleDelete = () => {
        setFile(null);
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        setSending(true);
        try {
            const ai = file ? await generateChartFromFileAndPrompt(file, input) : { chartSpec: null, response: 'Please upload a CSV/XLSX file first.', fieldsUsed: [] };
            console.log('AI Response:', ai);
            setInput('');
        } catch (e) {
            console.error('Error:', e.message);
        } finally {
            setSending(false);
        }
    };

    const fileThumbnail = file ? (
        <div className="w-12 h-12 bg-primary rounded flex items-center justify-center text-white font-bold">
            {file.type?.includes('csv') ? 'CSV' : file.type?.includes('xlsx') ? 'XLS' : 'PDF'}
        </div>
    ) : null;

    return (
        <>
            <div className="absolute fade-in flex flex-col gap-2 left-[50%] md:w-[60vw] w-full bottom-0 md:bottom-[5vh] translate-x-[-50%]">
                {wake && file &&
                    (<div id={agent} className="md:px-4 px-4 filePreviewAppear py-4 bg-backdrop mx-auto md:rounded-3xl md:w-full w-[95vw] md:h-[13vh] h-[8vh] rounded-2xl flex flex-row items-center justify-between gap-2 border-dashed border-1 border-strokethick">
                    <div className="h-full">
                        {fileThumbnail}
                    </div>
                    <div className="text-hue flex flex-row justify-center gap-4 items-center flex-1"><p className="md:text-xl text-sm">{file?.name}</p> <p className="md:text-[10px] text-[8px] font-light py-1 px-2 bg-primary text-white rounded-2xl">{file?.size}KB</p></div>
                    <button onClick={handleDelete} className="md:px-3  flex gap-1 flex-row justify-center items-center md:py-2 md:text-sm text-2xl md:bg-red-500 cursor-pointer active:scale-90 md:text-white text-red-500 transition-all duration-300 ease-in-out rounded-3xl"><p className="hidden md:block">Delete</p>< IoTrashOutline/></button>
                </div>)
                }
                <div className="md:px-4 z-2 px-4 py-4 md:rounded-3xl w-full h-full rounded-t-2xl flex flex-col bg-inputbg">
                    <h2 className="opacity-50 text-hue">Customize with prompts</h2>
                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border-none outline-0 text-hue" type="text" />
                        {!file && 
                            (<button onClick={triggerHiddenInput} className="md:text-2xl text-xl cursor-pointer p-3 rounded-[50%] bg-primary text-white">
                            <FiPaperclip/>
                            <input  accept=".csv, .xlsx, .xls, application/pdf" onChange={handleFileChange} ref={hiddenInput} className="hidden" type="file" name="" id="" />
                        </button>)
                        }
                        <button disabled={sending} onClick={handleSend} className="md:text-2xl text-xl cursor-pointer p-3 rounded-[50%] bg-primary text-white disabled:opacity-50">
                             <TbArrowForwardUp/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PromptInput;
