import Navpanel from "../components/Navpanel";
import Navbar from "../components/navbar";
import Chatview from "../components/Chatview";
import { use, useEffect, useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { getAllProjects } from "../db/ChartoraDB";

function HomePage () {
    //This block fetches the Project from indexeddb & sets the selected project ID

    const [lastprojectID, setLastProjectID] = useState(() => {
        const status = JSON.parse(localStorage.getItem('selectedID')) || null;
        return status;
    });

    useEffect (() => {
        const getProject = async () => 
        {const all = await getAllProjects();
        setLastProjectID(JSON.parse(localStorage.getItem('selectedID')) || all[all.length - 1].id);
        };

        getProject();

        console.log(`Last Project ID: ${lastprojectID}`);
            
    }, []);


    //is the navbar opened or closed?
    const [opened, setOpened] = useState (false);

    const [navClicked, setNavClicked] = useState(false);

    //handles swipeable Function
    const handlers = useSwipeable ({
        onSwipedRight: () => setOpened(true),
        onSwipedLeft: () => setOpened (false),
        trackTouch: true,
    });

    return (
        <>
            <div {...handlers} className="flex md:flex-row md:gap-2 w-screen h-screen md:w-[99vw] md:h-[98svh]">
                {opened && <Navpanel navOpened={(e) => {
                    setNavClicked(e)
                }} agent={lastprojectID} selectedID={(e) => {
                    console.log(e)
                    setLastProjectID(e)
                }} setOpened={()=> {
                    setOpened(false)
                }}/>}

                {!opened && <Navbar selectedID={(e) => {
                    console.log(e)
                    setLastProjectID(e)
                }} setOpened={()=> {
                    setOpened(true)
                }}/>}
                
                <Chatview navOpened={!navClicked} agent={lastprojectID}/>
            </div>
        </>
    );
}

export default HomePage;