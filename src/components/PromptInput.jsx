import { FiUpload } from "react-icons/fi";
import { TbArrowForwardUp } from "react-icons/tb";
import { FiPaperclip } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { useUploadStore, processAndStoreFile } from "../utils/globalFunctions";
import { IoTrashOutline } from "react-icons/io5";
import { deleteProjectFile, db, addMessage } from "../db/ChartoraDB";
import { generateChartFromFileAndPrompt } from "../services/aiService";
import xlsx from '/xlsx.png';
import csv from '/csv.png';
import pdf from '/pdf-file.png';

function PromptInput ({agent, filePreview}) {

    const file = useUploadStore((state) => state.file);

    let fileThumbnail;
    if (file && file.type === "text/csv") {
        fileThumbnail = <img className="h-full" src={csv} alt="" />;
    } else if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        fileThumbnail = <img className="h-full" src={xlsx} alt="" />;
    } else if (file && file.type === 'application/pdf') {
        fileThumbnail = <img className="h-full" src={pdf} alt="" />;
    }
    
    const [wake, setWake] = useState(true)

    const hiddenInput = useRef(null);

    const triggerHiddenInput = () => {
        hiddenInput.current.click();
    }

    const handleDelete = async () => {
        console.log(agent)
        await deleteProjectFile(agent);

        useUploadStore.getState().clearFile(); // ✅ delete from Zustand store
        setWake((prev) => !prev);
    };

    const setFile = useUploadStore((state) => state.setFile);

    const handleFileChange =async (event) => {
        const file = await event.target.files[0];
        processAndStoreFile(file, agent, setFile);
        setWake((prev) => !prev);
        console.log("Selected file:", file);
    };

    useEffect(() => {
        const loadSession = async () => {
        const project = await db.projects.get(agent);
    
        const session = project?.sessions || {};
        setWake(session.filePreview ?? true);
        };
    
        if (agent) {
        loadSession();
        }
    
    }, [agent]);

    useEffect(() =>{
        filePreview(wake)
    }, [wake])

    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        const project = await db.projects.get(agent);
        const files = project?.file || [];
        const rebuilt = files.length ? (() => {
            const f = files[files.length - 1];
            const byteArray = new Uint8Array(f.content);
            const blob = new Blob([byteArray], { type: f.type });
            return new File([blob], f.name, { type: f.type, lastModified: f.uploadedAt || Date.now() });
        })() : null;

        setSending(true);
        try {
            await addMessage(agent, { type: 'text', role: 'user', content: input, ts: Date.now() });
            const ai = rebuilt ? await generateChartFromFileAndPrompt(rebuilt, input) : { chartSpec: null, response: 'Please upload a CSV/XLSX file first.', fieldsUsed: [] };
            await addMessage(agent, { type: 'chart', role: 'assistant', payload: ai, ts: Date.now() });
            localStorage.setItem('start', 'true');
            setInput('');
        } catch (e) {
            await addMessage(agent, { type: 'text', role: 'assistant', content: `Error: ${e.message}`, ts: Date.now() });
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <div className="absolute fade-in flex flex-col gap-2 left-[50%] md:w-[60vw] w-full bottom-0 md:bottom-[5vh] translate-x-[-50%]">
                {wake &&
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
                        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border-none outline-0 text-hue" type="textarea" />
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