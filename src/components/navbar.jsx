import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { MdLightMode } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { RiChatNewLine } from "react-icons/ri";
import { createNewProject } from '../db/ChartoraDB';

function Navbar ({setOpened}) {

    const [mood, setMood] = useState(() => {
        const status = JSON.parse(localStorage.getItem('clicked')) || false;
        return status;
    })

    useEffect(() => {
        localStorage.setItem('clicked', JSON.stringify(mood))
    }, [mood])

    useEffect(() => {
        const themed = localStorage.getItem('themed')
        if (themed === 'dark'){
            const root = document.documentElement;
            root.classList.add('dark')
        } else if (themed === 'light'){
            const root = document.documentElement;
            root.classList.remove('dark')
        }
    }, []);

    const handleCreateProject = async () => {
    const title = prompt("Enter your project title:");

    if (title && title.trim() !== '') {
      const newProject = await createNewProject(title.trim());
      console.log("New project created:", newProject);
    }
    };

    return (
        <>
        <div className="md:w-[5%] md:relative fixed top-0 z-1 flex md:flex-col md:items-center items-center md:gap-4 md:justify-start bg-backdrop md:bg-transparent justify-between border-b-1 md:border-0 border-stroke left-0 right-0 md:h-[100%] md:py-4 px-2 pt-4 transition-colors duration-500 ease-in-out">
           <button onClick={setOpened} className="p-3 md:rounded-xl md:hover:bg-accent cursor-pointer md:text-xl text-2xl text-primary">
            <TbLayoutSidebarLeftExpand/>
           </button>

           <h2 className="md:hidden text-hue text-xl font-medium">Chartora</h2>

           <button onClick={
            () => {
                setMood(!mood)
                const root = document.documentElement;
                const dark = root.classList.toggle('dark');
                localStorage.setItem('themed', ( dark ? 'dark' : 'light'))
            }
            }
            className="p-3 md:rounded-xl md:hover:bg-accent cursor-pointer md:text-xl text-2xl text-primary">
            {!mood ? <IoMoonSharp /> : <MdLightMode/> }
           </button>

           <button onClick={handleCreateProject} className="md:p-3 p-2 px-4 hidden md:flex md:rounded-xl md:hover:bg-accent cursor-pointer md:text-2xl md:text-primary">
            <RiChatNewLine/>
           </button>

        </div>
        </>
    );
}

export default Navbar;