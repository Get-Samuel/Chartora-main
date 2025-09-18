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
    images: []
  });
});
