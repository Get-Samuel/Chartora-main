import ChartoraLogo from '/Chartora-Logo.svg';

function Loading() {
    return(
        <div className='h-[100svh] w-full flex flex-col items-center gap-4 justify-center'>
            <img src={ChartoraLogo} alt="" />
            <div className='overflow-hidden bg-blue-400 w-[200px] h-[5px] rounded-sm'>
               <div className='bg-[#253D8A] w-[20%] h-[5px] rounded-sm animate-slide'></div>
            </div>
        </div>
            
    )
}

export default Loading;