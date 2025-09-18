import Upload from "./Upload";
import PromptInput from "./PromptInput";
import Platform from "./Platform";
import { useState, useEffect } from "react";
import CircularProgress from "./CircularProgress";
import { storeFile, getProjectSession, updateProjectSession, db, extractProjectFiles } from "../db/ChartoraDB";
import { useUploadStore,  processAndStoreFile } from '../utils/globalFunctions';

function Chatview ({agent, navOpened}) {

    getProjectSession(agent);

    const setFile = useUploadStore((state) => state.setFile);

    useEffect(() => {
        const restoreFile = async () => {
            const fileDB = await extractProjectFiles(agent);
            const plainFiles = fileDB.map(f => ({
            name: f.name,
            size: f.size,
            type: f.type,
            lastModified: f.lastModified,
            }));
            setFile(plainFiles[0]);
        };
    
        restoreFile();
    }, [agent]);

    //Condition to toggle between Platform & Upload
    const [uploaded, setUpload] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(null);
    const [filePreview, setFilePreview] = useState(null)

    const handleProgress = (progress) => {
    setUploadProgress(progress);
    setUploading(progress < 100);
    };

    //read values from indexeddb
    useEffect(() => {
    const loadSession = async () => {
    const project = await db.projects.get(agent);

    const session = project?.sessions || {};
    setUpload(session.uploaded ?? true);   // if null → false
    setUploading(session.uploading ?? false); // if null → false
    setFilePreview(session.filePreview ?? true);
    };

    if (agent) {
    loadSession();
    }

    }, [agent]);


    useEffect(() => {
      console.log(`agent: ${agent}`);
       updateProjectSession(agent, uploaded, uploading, filePreview)
    }, [uploaded, uploading]);

    useEffect(() => {
      console.log(`agent: ${agent}`);
       updateProjectSession(agent, uploaded, uploading, filePreview)
    }, [filePreview]);

    return (
        <>
        <div className={`flex-1 w-[100%] relative h-screen md:flex flex-col justify-center overflow-hidden md:border-1 md:border-stroke md:h-[100%] md:rounded-xl md:p-4 p-2 transition-colors duration-500 ease-in-out ${!navOpened && 'hidden'}`}>
            {uploaded 
                &&
            (<Upload
                onProgress={handleProgress}
                upload={() => {
                    setUpload(false)
                }}
                agent={agent}
            />)
            }

            {uploading && <CircularProgress progress={uploadProgress} size={180} /> }

            {!uploaded && !uploading && (
            <>
                <Platform agent={agent} />
                <PromptInput agent={agent} filePreview={(e) => {
                    setFilePreview(e);
                }} />
            </>
            )}

        </div>
        </>
    );
}

export default Chatview;