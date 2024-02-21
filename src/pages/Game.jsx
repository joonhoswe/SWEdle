import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Game = () => {
    let navigate = useNavigate();
    const goToHome = () => {
        navigate('/Home');
    };

    const goToHowToPlay = () => {
        // Assuming you have a route for the How to Play page
        navigate('/HowToPlay');
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
                    onClick={goToHowToPlay}
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
        </div>
    );
};

export default Game;
