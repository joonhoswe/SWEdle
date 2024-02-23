import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup"; 

const Game = () => {

    const [buttonPopup, setButtonPopup] = useState(false);

    const [guesses, setGuesses] = useState(Array(6).fill(Array(5).fill("")));      // 6 guesses
    const [guessStatus, setGuessStatus] = useState(Array(6).fill(Array(5).fill("null")));   // status for each guess

    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

    const [gameWon, setGameWon] = useState(false);
    const [gameLost, setGameLost] = useState(false);


    

    let navigate = useNavigate();
    const goToHome = () => {
        navigate('/Home');
    };

    useEffect(() => {
        // Adding the keydown event listener when the component mounts
        const letterTyped = (event) => {
            
            const ans = ["R", "E", "A", "C", "T"];
            const regex = /^[a-z]$/i;     // used to test if keyboard input is a letter

            if (currentGuessIndex < 6)  // while guesses are left
            {
                const newGuesses = [...guesses];
                const newGuess = [...newGuesses[currentGuessIndex]];
                const letterIndex = newGuess.indexOf("");

                if (regex.test(event.key) && letterIndex !== -1) 
                {
                    newGuess[letterIndex] = event.key.toUpperCase();
                    newGuesses[currentGuessIndex] = newGuess;
                    setGuesses(newGuesses);
                }
                else
                {
                    if (event.key === "Backspace" || event.key === "Delete") 
                    {
                        let delIndex = newGuess.indexOf("");
    
                        // found an empty space, meaning previous index is a letter
                        // don't check delIndex = 0 to prevent idx out of bounds, + empty at 0 means empty array
                        if (delIndex !== -1 && delIndex !== 0)        
                        {
                            newGuess[delIndex - 1] = "";
                            newGuesses[currentGuessIndex] = newGuess;
                            setGuesses(newGuesses);
                        }
                        else            // no empty space, meaning array is full
                        {
                            newGuess[4] = "";        // delete by replacing last index's letter with a empty string
                            newGuesses[currentGuessIndex] = newGuess;
                            setGuesses(newGuesses);
                        }
                    }
                    else if (event.key === "Enter") 
                    {
                        let index = newGuess.indexOf("");
    
                        if (index !== -1) // ensure full word is entered before check
                        {
                            alert("Please write a complete word before checking!"); 
                        }   
                        else if (index === -1) { // Ensure the guess is complet
    
                            // First pass: Mark correct positions as "correct"
                            const ansCopy = [...ans]; // Copy of answer for mutable operations
                            const newGuessStatus = [...guessStatus];
                            const status =  new Array(5).fill("wrong");
    
                            for (let i = 0; i < newGuess.length; i++) {
                                if (newGuess[i] === ans[i]) 
                                {
                                    status[i] = "correct"; // Mark as correct
    
                                    ansCopy[i] = null; // Remove the matched letter from consideration
                                }
                            }
                    
                            // Second pass: Find present but wrong spot letters based on unmatched letters and their frequency
                            newGuess.forEach((letter, i) => {
                                if (status[i] !== "correct") { // Skip already correctly matched letters
                                    if (ansCopy.includes(letter)) 
                                    {
                                        // If letter is present in the answer but not yet matched, it's potentially yellow
                                        // Remove this letter from ansCopy to acknowledge its accounted occurrence
                                        const removeIndex = ansCopy.indexOf(letter);
                                        ansCopy[removeIndex] = null; // Remove from consideration
    
                                        status[i] = "present"; 
                                    } 
                                    else
                                    {
                                        status[i] = "wrong";
                                    }
                                }
                            });
                            
                            newGuessStatus[currentGuessIndex] = status;
                            setGuessStatus(newGuessStatus);

                            let correct = true;
                            newGuess.forEach((letter, i) => {
                                if (status[i] !== "correct") correct = false;
                            });

                            if (correct) setGameWon(true);

                            setCurrentGuessIndex(currentGuessIndex + 1);
                        } 
                    }
                } 
            }
        };

        if (currentGuessIndex === 6) setGameLost(true);

        window.addEventListener("keydown", letterTyped);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", letterTyped);
        };

    }, [guesses, currentGuessIndex, guessStatus]);

    
    return (
        <div className="bg-gray-900 h-screen flex flex-col">
            {/* Header*/}
            <div className="w-full flex justify-between items-center pt-3 px-4 pb-4">
                {/* Return Home button */}
                <button 
                    className="hover:scale-110 bg-white bg-opacity-25 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none" 
                    onClick={goToHome}>

                    Return Home
                </button>

                {/* Game Name */}
                <h1 className="text-white text-4xl font-sans">SWEdle</h1>

                {/* How to Play button */}
                <button 
                    className="hover:scale-110 bg-white bg-opacity-25 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none" 
                    onClick={() => setButtonPopup(true)}>

                    How to Play
                </button>
            </div>

            {/* White line below header */}
            <div className="w-full border-t-4 border-white pt-4"></div>

            {/* Game content */}

             {/* Game Board for Guesses */}
            <div className="flex flex-col items-center justify-center">
                {guesses.map((guess, guessIndex) => (
                    <div key={guessIndex} className="flex justify-center items-center space-x-4 my-2">
                        {guess.map((letter, letterIndex) => (
                            <div key={letterIndex} className={` text-white border-2 h-16 w-16 flex justify-center items-center text-4xl ${guessStatus[guessIndex][letterIndex] === 'correct' ? 'bg-green-500 scale-110 transition duration-600 ease-in-out' : guessStatus[guessIndex][letterIndex] === 'present' ? 'bg-yellow-500 scale-110 transition duration-600 ease-in-out' :  guessStatus[guessIndex][letterIndex] === 'wrong' ? 'bg-red-500 scale-110 transition duration-600 ease-in-out' : 'bg-transparent'}`}>
                            {letter}
                            </div>
                        ))}
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
            
            {/* Pop-up for Game Won */}
            <Popup trigger={gameWon} setTrigger={setGameWon}>
                <h3 className="text-2xl text-green-500">Congratulations!</h3>
                <p className="mt-4 text-white">You have correctly guessed the correct word! </p> <br></br> 
                <p className="mt-2 text-white">Refresh the website to try again with a different word!</p>
            </Popup>

            {/* Pop-up for Game Lost */}
            <Popup trigger={gameLost} setTrigger={setGameLost}>
                <h3 className="text-2xl text-red-500">Game Over!</h3>
                <p className="mt-4 text-white">You have used all 6 guesses and were unable to guess the correct word. </p> <br></br> 
                <p className="mt-2 text-white">Refresh the website to try again with a different word!</p>
            </Popup>
        </div>

    );
};

export default Game;