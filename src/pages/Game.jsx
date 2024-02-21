import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup"; 

const Game = () => {

    const [buttonPopup, setButtonPopup] = useState(false);
    const [guess, setGuess] = useState(["", "", "", "", ""]);

    let regex = /^[a-z]$/i;     // used to test if keyboard input is a letter

    let navigate = useNavigate();
    const goToHome = () => {
        navigate('/Home');
    };

    useEffect(() => {
        // Adding the keydown event listener when the component mounts
        const letterTyped = (event) => {
            if (regex.test(event.key)) 
            {
                let index = guess.indexOf("");
                if (index !== -1)
                {
                    const newGuess = [...guess];
                    newGuess[index] = event.key.toUpperCase();
                    setGuess(newGuess);
                }
            }
            else if (event.key === "Backspace" || event.key === "Delete") 
            {
                let delIndex = guess.indexOf("");

                // found an empty space, meaning previous index is a letter
                // don't check delIndex = 0 to prevent idx out of bounds, + empty at 0 means empty array
                if (delIndex !== -1 && delIndex !== 0)        
                {
                    const newGuess = [...guess];
                    newGuess[delIndex - 1] = "";
                    setGuess(newGuess);
                }
                else            // no empty space, meaning array is full
                {
                    const newGuess = [...guess];
                    newGuess[4] = "";
                    setGuess(newGuess);
                }
            }
            
        };

        window.addEventListener("keydown", letterTyped);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", letterTyped);
        };
    }, [guess]);


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

            {/* Row for Guess 1 */}
            <div className="flex justify-center items-center space-x-4 mt-8 pt-3 pb-4">
                {guess.map((letter, index) => (
                    <div key={index} className="border-2 border-gray-700 text-white h-20 w-20 flex justify-center items-center text-4xl">
                        {letter}
                    </div>
                ))}
            </div>


            {/* Additional content */}
            <div className="text-center mt-24 pb-3 w-full">
                <p className="text-white font-sans">Created by Jonathan Oh</p>
            </div>

            {/* Pop-up for How to Play */}
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
