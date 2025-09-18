import Dexie from 'dexie';

export const db = new Dexie('Chartora-DB');

//This block establishes the database
db.version(1).stores({
 projects: '++id, title, file, prompt, sessions, chatHistory, images'
});

//This block creates a new project
export const createNewProject = async (title) => {
    const newProject = {
        title,
        prompt: '', 
        file: [],
        sessions: {
        uploaded: true,
        uploading: false,
        filePreview: true,
        },
        chatHistory: [],
        images: []
    };

    const id = await db.projects.add(newProject);

    return {...newProject, id};
}

/* //This block sets the selected project ID
export const setSelectedProjectId = async (id) => {
  await db.settings.put({ key: 'selectedProjectID', value: id });
};

//This block gets the selected project ID
export const getSelectedProjectId = async () => {
  const setting = await db.settings.get('selectedProjectID');
  return setting ? setting.value : null;
}; */

//This block deletes a project
export const deleteProject = async (projectId) => {
  await db.projects.delete(projectId);
};

//This block updates the prompt in the DB
export const updatePrompt = async (projectID, newPrompt) => {
    await db.projects.update(projectID, {prompt: newPrompt})
}; 

//This block updates the title of a project
export const handleEditTitle = async (projectID, newTitle) => {
  await db.projects.update(projectID, { title: newTitle });
}

//This block updates the session of a project
// Update 'uploaded' inside the 'sessions' object
export const updateSession = async (projectID, updates = {}) => {
  const project = await db.projects.get(projectID);
  if (!project) return;

  const updatedSessions = {
    ...project.sessions,
    ...updates,
  };

  await db.projects.update(projectID, {
    sessions: updatedSessions,
  });
};

//This block adds the file to the project
export const storeFile = async (file, projectId) => {
  if (!(file instanceof File)) {
    throw new Error("Not a valid File object");
  }

  // Convert file content to Uint8Array for safe Dexie storage
  const arrayBuffer = await file.arrayBuffer();
  const uint8Content = new Uint8Array(arrayBuffer);

  // Build the file object to store
  const fileObj = {
    name: file.name,
    type: file.type,
    size: file.size,
    content: Array.from(uint8Content), // Store as plain array for Dexie compatibility
    uploadedAt: Date.now(),
  };

  // Get the project
  const project = await db.projects.get(projectId);
  if (!project) throw new Error('Project not found');

  // Update the file array
  const updatedFiles = [...(project.file || []), fileObj];

  // Save updated project
  await db.projects.update(projectId, { file: updatedFiles });

  return fileObj;
};


//This block extracts the file for a project
export const extractProjectFiles = async (projectId) => {
  const project = await db.projects.get(projectId);
  console.log("Project:", project);
  if (!project || !project.file?.length) return [];

  const files = project.file.map(f => {
    const byteArray = new Uint8Array(f.content); // Rebuild Uint8Array
    const blob = new Blob([byteArray], { type: f.type });

    return new File([blob], f.name, {
      type: f.type,
      lastModified: f.uploadedAt || Date.now(),
    });
  });

  console.log('The File:', files)

  return files;
};

//This block adds a chat message to the history
export const addMessage = async (projectID, message) => {
    const project = await db.projects.get(projectID);
    const updatedChat = [...(project.chatHistory || []), message];
    await db.projects.update(projectID, { chatHistory: updatedChat});
}

//This block adds an Image in the DB
export const addImage = async (projectId, image) => {
  const project = await db.projects.get(projectId);
  const updatedImages = [...(project.images || []), image];
  await db.projects.update(projectId, { images: updatedImages });
};

//This block loads all project 
export const getAllProjects = async () => {
  return await db.projects.toArray();
};

//This block loads 1 project only 
export const getProjectById = async (id) => {
  return await db.projects.get(id);
};

//Update project session
export const updateProjectSession = async (projectId,  uploaded, uploading, filePreview) => {
  try {
    const project = await db.projects.get(projectId);

    if (!project) {
      console.error('Project not found with ID:', projectId);
      return;
    }

    // Update the session inside the project
    await db.projects.update(projectId, {
      sessions: {
        ...project.sessions,
        uploaded: uploaded ?? project.sessions.uploaded,
        uploading: uploading ?? project.sessions.uploading,
        filePreview: filePreview ?? project.sessions.filePreview,
      }
    });

    console.log(`Updated session for project ${projectId}`);
  } catch (error) {
    console.error('Failed to update session:', error);
  }
};

//get project session 
export const getProjectSession = async (projectId) => {
  try {
    const project = await db.projects.get(projectId);

    if (!project) {
      console.error('Project not found with ID:', projectId);
      return null;
    }

    const session = project.sessions || { uploading: null, uploaded: null, filePreview: null };

    console.log(`Retrieved session for project ${projectId}`, session);
    return session;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
};

//This block deletes a projects uploaded File 
export const deleteProjectFile = async (projectId) => {
  try {
    const project = await db.projects.get(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    // Clear the file array
    await db.projects.update(projectId, { file: [] });

    console.log(`Files deleted for project ${projectId}`);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};

//This block saves the chat History to indexeddb
export const saveChatToDB = async (newMessages) => {
    const project = await db.projects.get(projectId);
    await db.projects.update(projectId, {
      ...project,
      chatHistory: newMessages
    });
    };

//This block creates a New Project
db.on('populate', async () => {
  await db.projects.add({
    title: '',
    prompt: '',
    file: [],
    sessions: {
      uploaded: true,
      uploading: false,
      filePreview: true,
    },
    chatHistory: [],
    images: [],
    usage: {
      limit: 5, // max allowed prompts
      used: 0 ,  // how many used
      lastUsedDate: 'YYYY-MM-DD'
    }

  });
});

