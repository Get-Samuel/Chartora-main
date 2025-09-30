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

//This block deletes a project
export const deleteProject = async (projectId) => {
  await db.projects.delete(projectId);
};

//This block updates the title of a project
export const handleEditTitle = async (projectID, newTitle) => {
  await db.projects.update(projectID, { title: newTitle });
}

//This block loads all project 
export const getAllProjects = async () => {
  return await db.projects.toArray();
};

//This block loads 1 project only 
export const getProjectById = async (id) => {
  return await db.projects.get(id);
};

<<<<<<< HEAD
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
export const saveChatToDB = async (projectId, newMessages) => {
  const project = await db.projects.get(projectId);
  if (!project) return;
  await db.projects.update(projectId, {
    ...project,
    chatHistory: newMessages
  });
};

=======
>>>>>>> recovered-work
//This block creates a New Project
db.on('populate', async () => {
  await db.projects.add({
    title: 'Default Project',
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
