import ChartoraLogo from '/Chartora-Logo-Horizontal.svg';

function WelcomeScreen () {
    return(
        <>
            <div className="w-full h-fit md:gap-[15vh] gap-[2vh] justify-center items-center flex flex-col">
                <div className="md:w-[30%] md:flex hidden w-[50%]"><img src={ChartoraLogo} alt="" /></div>
                <p className="text-center opacity-70 text-hue">
                Hey there, what's good?
                </p>
            </div>
        </>
    );
}

export default WelcomeScreen;