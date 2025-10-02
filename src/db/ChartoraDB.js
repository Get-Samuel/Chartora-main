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

//This block loads 1 project only 
export const getProjectById = async (id) => {
  return await db.projects.get(id);
};

//This block updates session data
export const updateSession = async (projectId, sessionData) => {
  try {
    const project = await db.projects.get(projectId);
    if (!project) {
      console.error('Project not found with ID:', projectId);
      return;
    }

    await db.projects.update(projectId, {
      sessions: {
        ...project.sessions,
        ...sessionData
      }
    });

    console.log(`Session updated for project ${projectId}`);
  } catch (error) {
    console.error('Failed to update session:', error);
  }
};

//This block stores a file to a project
export const storeFile = async (file, projectId) => {
  try {
    const project = await db.projects.get(projectId);
    if (!project) {
      console.error('Project not found with ID:', projectId);
      return;
    }

    // Store file data
    const fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      data: await file.arrayBuffer()
    };

    await db.projects.update(projectId, {
      file: [fileData]
    });

    console.log(`File stored for project ${projectId}`);
  } catch (error) {
    console.error('Failed to store file:', error);
  }
};

//This block extracts files from a project
export const extractProjectFiles = async (projectId) => {
  try {
    const project = await db.projects.get(projectId);
    if (!project) {
      console.error('Project not found with ID:', projectId);
      return [];
    }

    return project.file || [];
  } catch (error) {
    console.error('Failed to extract files:', error);
    return [];
  }
};

//This block adds a message to chat history
export const addMessage = async (projectId, message) => {
  try {
    const project = await db.projects.get(projectId);
    if (!project) {
      console.error('Project not found with ID:', projectId);
      return;
    }

    const updatedHistory = [...(project.chatHistory || []), message];
    await db.projects.update(projectId, {
      chatHistory: updatedHistory
    });

    console.log(`Message added to project ${projectId}`);
  } catch (error) {
    console.error('Failed to add message:', error);
  }
};

//This block updates session data
export const updateSession = async (projectId, sessionData) => {
  try {
    const project = await db.projects.get(projectId);
    if (!project) {
      console.error('Project not found with ID:', projectId);
      return;
    }

    await db.projects.update(projectId, {
      sessions: {
        ...project.sessions,
        ...sessionData
      }
    });

    console.log(`Session updated for project ${projectId}`);
  } catch (error) {
    console.error('Failed to update session:', error);
  }
};

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
