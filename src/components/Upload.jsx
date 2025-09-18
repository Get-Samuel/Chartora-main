import csv from '/csv.png';
import xlsx from '/xlsx.png';
import pdf from '/pdf-file.png';
import { useDropzone } from 'react-dropzone';
import { RiErrorWarningLine } from "react-icons/ri";
import { useEffect, useState, useCallback } from 'react';
import { storeFile, getAllProjects, extractProjectFiles } from '../db/ChartoraDB';
import { useUploadStore,  processAndStoreFile } from '../utils/globalFunctions';

function Upload ({upload,  onProgress, agent}) {
    const [isDragActive, setIsDragActive] = useState(false);

        const setFile = useUploadStore((state) => state.setFile);

        const onDrop = useCallback((acceptedFiles) => {
        setIsDragActive(false);
        // Handle file upload
        console.log('Files:', acceptedFiles);

        const file = acceptedFiles[0];
        if (!file) return;

        // ✅ Call your reusable file logic here
        processAndStoreFile(file, agent, setFile);

        if(file){
            setTimeout( async () => {
                upload();

                await updateSession(agent, {
                uploaded: false,
                uploading: false,
                });

            }, 200);
        }

        if (!file) return;

        let uploaded = 0;
        const fileSize = file.size;
        const chunkSize = fileSize / 100;

        const simulateUpload = setInterval(() => {
        uploaded += chunkSize;
        const progress = Math.min((uploaded / fileSize) * 100, 100);
        onProgress(progress);

        if (progress >= 100) {
            clearInterval(simulateUpload);
        }
        }, 200);

        }, [onProgress]);

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

    /*  //Set the file for Zustand
    const extractFile = async () => {
        const fileDB = await extractProjectFiles(agent);
        setFile(fileDB);
        console.log(fileDB);
    }

    extractFile(); */

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
