import ChartoraLogo from '/Chartora-Animation_Transparent.gif';

function Loading() {
    return(
        <div className='h-[100svh] w-full flex flex-col items-center gap-4 justify-center'>
            <img src={ChartoraLogo} className="w-[50vw] md:w-[20vw]" alt="" />
        </div>
            
    )
}

export default Loading;