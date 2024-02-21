import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup"; 

const Game = () => {

    const [buttonPopup, setButtonPopup] = useState(false);

    let navigate = useNavigate();
    const goToHome = () => {
        navigate('/Home');
    };

    return (
        <div className="bg-gray-900 h-screen flex flex-col">
            {/* Header*/}
            <div className="w-full flex justify-between items-center pt-3 px-4 pb-4">
                {/* Return Home button */}
                <button 
                    className="hover:scale-110 bg-white bg-opacity-25 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none" 
                    onClick={goToHome}
                >
                    Return Home
                </button>

                {/* Game Name */}
                <h1 className="text-white text-3xl font-sans">SWEdle</h1>

                {/* How to Play button */}
                <button 
                    className="hover:scale-110 bg-white bg-opacity-25 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none" 
                    onClick={() => setButtonPopup(true)}
                >
                    How to Play
                </button>
            </div>

            {/* White line below header */}
            <div className="w-full border-t-4 border-white pt-4"></div>

            {/* Game content */}

            {/* Additional content */}
            <div className="text-center mt-24 pb-3 w-full">
                <p className="text-white font-sans">Created by Jonathan Oh</p>
            </div>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3 className="text-xl text-white">How to Play</h3>
                <p className="mt-4 text-white">Guess the SWE word in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the word. </p> <br></br> 
                <p className="mt-2 text-white"> A green tile indicates a correct letter and correct position. A yellow tile
                 indicates a correct letter, but an incorrect position. A grey tile indicates an incorrect letter that won't be in the word.</p>
            </Popup>
        </div>
    );
};

export default Game;
