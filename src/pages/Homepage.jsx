import Navpanel from "../components/Navpanel";
import Navbar from "../components/navbar";
import Chatview from "../components/Chatview";
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';

function HomePage () {
    //is the navbar opened or closed?
    const [opened, setOpened] = useState(false);
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
                }} setOpened={()=> {
                    setOpened(false)
                }}/>}

                {!opened && <Navbar setOpened={()=> {
                    setOpened(true)
                }}/>}
                
                <Chatview navOpened={navClicked}/>
            </div>
        </>
    );
}

export default HomePage;