import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import HomePage from "./pages/Homepage";
import Authpage from "./pages/Authpage";
import { Routes, Route } from 'react-router-dom';

function App() {

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
                <Route path='/' element = {loaded ? (<Loading/>) : (<Authpage/>)} /></Routes>
        </>
    );
}

export default App;