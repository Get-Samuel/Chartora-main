import { create } from 'zustand';
import { db, storeFile, extractProjectFiles } from '../db/ChartoraDB';

export const useUploadStore = create((set) => ({
  file: null,
  uploading: false,
  setFile: (file) => set({ file })
}));

export const getSessionStatus = async (projectID) => {
  const project = await db.projects.get(projectID);
  return project?.sessions || { uploaded: true, uploading: false };
};

/**
 *
 * @param {File} file 
 * @param {string} agent 
 * @param {Function} setFile 
 */
export const processAndStoreFile = async (file, agent, setFile) => {
  if (!file || !agent || typeof setFile !== 'function') {
    console.warn('Invalid arguments passed to processAndStoreFile');
    return;
  }

  try {
    await storeFile(file, agent);

    const fileDB = await extractProjectFiles(agent);

    const plainFiles = fileDB.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      lastModified: f.lastModified,
    }));

    setFile(plainFiles[0]);
    console.log("File saved and Zustand updated:", plainFiles[0]);
  } catch (error) {
    console.error("Error in processAndStoreFile:", error);
  }
};


