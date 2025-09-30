import { create } from 'zustand';

export const useUploadStore = create((set) => ({
  file: null,
  uploading: false,
  setFile: (file) => set({ file }),
  clearFile: () => set({ file: null }),
}));

<<<<<<< HEAD
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

    /* const plainFiles = fileDB.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      lastModified: f.lastModified,
    }));

    setFile(plainFiles[0]); */

    setFile({
    name: file.name,
    size: (file.size / 1024).toFixed(1),
    type: file.type,
    lastModified: file.lastModified
    }); // ✅ This should be a fresh object
    console.log("File saved and Zustand updated:", { name: file.name, size: (file.size / 1024).toFixed(1), type: file.type });
  } catch (error) {
    console.error("Error in processAndStoreFile:", error);
  }
};

=======
>>>>>>> recovered-work

