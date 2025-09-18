import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { RiChatNewLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { getAllProjects } from '../db/ChartoraDB'
import { useEffect, useState } from "react";
import { createNewProject } from '../db/ChartoraDB';
import { deleteProject } from '../db/ChartoraDB';
import { handleEditTitle } from "../db/ChartoraDB";

function Navpanel ({setOpened, selectedID, agent, navOpened, uploading}) {
    
    //This block fetches the Project from indexeddb & sets the selected project ID
    const [trigger, setTtigger] = useState(false);
    const [projects, setProject] = useState([]);
    const [deleteClicked, setDeleteClicked] = useState(false)
   /*  const [selectedProjectID, setSelectedProjectID] = useState(null); */
    const [lastID, setLastID ] = useState (() => {
        const status = JSON.parse(localStorage.getItem('selectedID')) || null;
        console.log(status)
        return status;
    })

    useEffect(() => {
        selectedID(lastID);
        console.log(`clicked to select: ${lastID}`);
        localStorage.setItem('selectedID', JSON.stringify(lastID));
    }, [lastID]);


    useEffect (() => {
        const getProject = async () => 
        {const all = await getAllProjects();
        setProject(all);
        };

        getProject();
        /* navOpened(trigger); */
    }, []);

    useEffect(() => {
    const getProject = async () => {
    const all = await getAllProjects();
    setProject(all);

    const stored = JSON.parse(localStorage.getItem('selectedID'));

    const validStored = all.find(p => p.id === stored);

    if (validStored) {
      //Use stored selected ID if it's still valid
      setLastID(stored);  
    } else {
      const fallback = all[all.length - 1]?.id;
      //Otherwise fallback to last item
      setLastID(fallback);  
      localStorage.setItem('selectedID', JSON.stringify(fallback));
    }
    };

    getProject();
    /* navOpened(trigger); */
    }, [deleteClicked]);


    //This block edits the title 
    const handleTitleChange = (id, newTitle) => {
    setProject(prev =>
      prev.map(project =>
        project.id === id ? { ...project, title: newTitle } : project
      )
    );
    };


    //When a input is unfocused --> stores the value into the indexeddb
    const handleBlur = async (id, title) => {
    await handleEditTitle(id, title);
    };

    //This block creates a new project
    const handleCreateProject = async () => {
        const title = prompt("Enter your project title:");

        if (title && title.trim() !== '') {
        const newProject = await createNewProject(title.trim());
        console.log("New project created:", newProject);
        };

        const getProject = async () => {
            const all = await getAllProjects();
            setProject(all);
            setLastID(all[all.length - 1].id);
            console.log(`All projects from the indexeddb: ${all}`);
        }

        getProject();
    };

    return(
    <>
        <div className="flex flex-col bg-backdrop gap-2 md:max-w-[24%] w-[100vw] h-[100%] p-2 md:p-4 sidebar-container rounded-xl expand-width md:border-1 border-stroke transition-colors duration-500 ease-in-out">
            <div className="flex w-full items-center">
                <p className="text-hue ml-4 self-center font-bold opacity-65 px-3 text-center w-fit rounded-2xl text-[12px]">Projects</p>
                <button onClick={
                    (e) => {
                    const sidebar = e.currentTarget.closest('.sidebar-container');
                    sidebar.classList.remove('expand-width');
                    sidebar.classList.add('collapse-width');

                    const buttonDiv = document.querySelector('.button-div');
                    buttonDiv.classList.remove('animate-content-appear');
                    buttonDiv.classList.add('animate-content-disappear');

                    setTimeout(() => {
                        setOpened()
                    }, 300)

                    setTtigger(!trigger)

                    setTimeout(() => {
                    navOpened(true)
                    }, 300)

                    }
                    } className="p-3 ml-auto rounded-xl bg-lightbg cursor-pointer text-primary md:text-xl text-2xl">
                <TbLayoutSidebarRightExpand />
                </button>
            </div>

            <ul className="w-full flex flex-col rounded-2xl overflow-y-auto project-container space-y-2 flex-1 h-full text-primary transition-all duration-300 ease-in-out">
                {projects.map((project) => 
                
                (<li key={project.id}
                onClick={() => {
                        console.log(`projectID: ${project.id}`);
                        /* selectedID(project.id); */
                        setLastID(project.id);
                }}
                
                className={`flex flex-row justify-between pl-3 items-center p-2 rounded-xl cursor-pointer hover:bg-hightlight transition-all duration-200 ease-in-out ${project.id === lastID ? 'bg-light' : 'bg-transparent'}`}>
                    {

                    (<input
                        placeholder="Untitled Project" 
                        spellCheck={false}
                        className="flex-1 text-hue cursor-pointer outline-0 border-0" type="text" 
                        value={project.title} 
                        onChange={(e) => handleTitleChange(project.id, e.target.value)}
                        onBlur={() => handleBlur(project.id, project.title) }
                    />)
                    
                    }

                    {projects.length > 1 && !uploading &&

                    (<button onClick={() => {
                        deleteProject(project.id);
                        setDeleteClicked(!deleteClicked)
                    }} className="text-xl text-red-500 p-2 rounded-xl hover:bg-stroke ml-auto cursor-pointer active:scale-80 transition-all duration-300 ease-in-out">
                        < FaRegTrashCan />
                    </button>)
                    
                    }

                </li>)
                
                )}

            </ul>

            <div className="button-div opacity-0 mb-4 animate-content-appear">
                <button onClick={handleCreateProject} className="w-full flex flex-row justify-center items-center gap-2 bg-primary p-3 rounded-md cursor-pointer active:scale-99 transition-all duration-300 text-white dark:text-black">New chat <RiChatNewLine/></button>
            </div>

        </div>
    </>
    );
}

export default Navpanel;