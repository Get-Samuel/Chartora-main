import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import HomePage from "./pages/Homepage";
import { Routes, Route, Router } from 'react-router-dom';
import { getAllProjects, extractProjectFiles } from "./db/ChartoraDB";

function App() {

    //This block fetches the Project from indexeddb & sets the selected project ID
    const [projects, setProject] = useState([]);
    const [selectedProjectID, setSelectedProjectID] = useState(null);
    useEffect(() => {

        const getProject = async () => 
        {const all = await getAllProjects();
        setProject(all);

        console.log(`Default Project ID: ${all[0].id}`);
    
        //Default project selected
        if (projects.length > 0) {
            setSelectedProjectID(all[0].id)
        }};

        getProject();
        
    }, [])


    //Introductory loading animation
    const [loaded, loadStatus] = useState(true)

    useEffect(() => {
        const Timer = setTimeout(() => {
            loadStatus(false);
        }, 3000);

        return () => clearTimeout(Timer);
    }, [])

    return(
        <>
            <Routes>
                <Route path='/' element = {loaded ? (<Loading/>) : (<HomePage/>)} />
            </Routes>
        </>
    );
}

export default App;