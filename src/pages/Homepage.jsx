import Navpanel from "../components/Navpanel";
import Navbar from "../components/navbar";
import Chatview from "../components/Chatview";
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';

function HomePage () {
    //is the navbar opened or closed?
    const [opened, setOpened] = useState(false);
    const [navClicked, setNavClicked] = useState(false);
    const [showChatview, setShowChatview] = useState(true);

    //handles swipeable Function
    const handlers = useSwipeable ({
        onSwipedRight: () => {
            setOpened(true);
            setShowChatview(false); // Hide chatview on mobile when opening navpanel
        },
        onSwipedLeft: () => {
            setOpened(false);
            setShowChatview(true); // Show chatview on mobile when closing navpanel
        },
        trackTouch: true,
    });

    const handleNavbarClick = () => {
        setOpened(true);
        setShowChatview(false); // Hide chatview on mobile when navbar button clicked
    };

    const handleNavpanelClose = () => {
        setOpened(false);
        setShowChatview(true); // Show chatview on mobile when navpanel closed
    };

    return (
        <>
            <div {...handlers} className="flex md:flex-row md:gap-2 w-screen h-screen md:w-[99vw] md:h-[98svh]">
                {opened && <Navpanel navOpened={(e) => {
                    setNavClicked(e)
                }} setOpened={handleNavpanelClose}/>}

                {!opened && <Navbar setOpened={handleNavbarClick}/>}
                
                <Chatview navOpened={navClicked} showChatview={showChatview}/>
            </div>
        </>
    );
}

export default HomePage;