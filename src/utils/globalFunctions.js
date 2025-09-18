import { create } from 'zustand';

export const useUploadStore = create((set) => ({
  file: null,
  uploading: false,
  setFile: (file) => set({ file })
}));


