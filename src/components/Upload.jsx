import csv from '/csv.png';
import xlsx from '/xlsx.png';
import pdf from '/pdf-file.png';
import { useDropzone } from 'react-dropzone';
import { RiErrorWarningLine } from "react-icons/ri";
import { useState, useCallback } from 'react';
import { useUploadStore, processAndStoreFile } from '../utils/globalFunctions';

function Upload ({upload, onProgress, agent}) {
    const [isDragActive, setIsDragActive] = useState(false);

    const setFile = useUploadStore((state) => state.setFile);

    const onDrop = useCallback((acceptedFiles) => {
        setIsDragActive(false);
        const file = acceptedFiles[0];
        if (!file) return;

        // Simple file processing
        processAndStoreFile(file, agent, setFile);
        
        if (upload) {
            upload();
        }

        // Simple progress simulation if callback provided
        if (onProgress) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                onProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }, [onProgress, agent, setFile, upload]);

    const MAX_FILE_SIZE_MB = 5;

    //dropzone setup
    const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
    noClick: false,
    noKeyboard: true,
    
    multiple: false,

    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    accept: {
        'application/pdf': [],
        'text/csv': [],
        'application/vnd.ms-excel': [],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    },
    });

    return(
    <>
        <div {...getRootProps()} className={`w-full md:rounded-2xl cursor-pointer text-center transition-all duration-300 ease-in-out text-hue gap-[2vh] h-full flex flex-col items-center justify-center fade-in  ${isDragActive ? 'bg-accent' : 'bg-transparent'}`}>
                <input {...getInputProps()} />
                <h3 className="md:hidden text-[7vw]">
                    Click to upload file
                    <p className="text-sm">Supported file formats</p>
                </h3>
                <h3 className="hidden md:block text-2xl">
                    Drag & Drop or Click to upload file
                    <p className="text-sm">Supported file formats</p>
                </h3>
                <div className='flex items-center p-3'>
                    <img width={60} className="-rotate-20 hover:scale-120 transition-all duration-300" src={xlsx} alt="" />
                    <img width={60} className='mx-1 -mt-4 hover:scale-120 transition-all duration-300' src={csv} alt="" />
                    <img width={60} className='rotate-20 hover:scale-120 transition-all duration-300' src={pdf} alt="" />
                </div>
                <div className='px-3 flex  flex-row justify-between items-center gap-2 py-2 rounded-xl bg-accent'><RiErrorWarningLine size={20}/>Max File size: 5MB</div>
        </div>
    </>
    );
}

export default Upload;
