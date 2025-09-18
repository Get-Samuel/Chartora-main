

function Chatview ({navOpened}) {
    return (
        <>
        <div className={`flex-1 w-[100%] relative h-screen md:flex flex-col justify-center overflow-hidden md:border-1 md:border-stroke md:h-[100%] md:rounded-xl md:p-4 p-2 transition-colors duration-500 ease-in-out ${!navOpened && 'hidden'}`}>
            <div className="flex items-center justify-center h-full">
                <h1 className="text-2xl text-gray-500">Chatview - Coming Soon</h1>
            </div>
        </div>
        </>
    );
}

export default Chatview;