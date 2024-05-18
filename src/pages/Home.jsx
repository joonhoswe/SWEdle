import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup"; 
import correctImage from '../images/correct.png';
import presentImage from '../images/present.png';
import wrongImage from '../images/wrong.png';

const Home = () => {
    let navigate = useNavigate();
    const [buttonPopup, setButtonPopup] = useState(false);

    const goToGame = () => {
        navigate('/Game');
    };

    return (
        <div className="bg-gray-900 flex flex-col justify-center items-center h-screen">
            <h1 className="text-white text-7xl font-sans mb-5">SWEdle</h1>
            <h2 className="text-gray-400 text-2xl font-sans mb-1">Get 6 chances to guess a 5-letter</h2>
            <h2 className="text-gray-400 text-2xl font-sans mb-2">SWE (Software Engineering) word.</h2>

            <div className="flex justify-center items-center space-x-6 mt-8">
                {/* <button onClick={() => setButtonPopup(true)} className="hover:scale-110 w-32 flex-shrink-0 bg-yellow-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none"> How to Play </button> */}
                <button className="hover:scale-110 w-32 flex-shrink-0 bg-green-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none" onClick={goToGame}> Play! </button>
                {/* <button className="hover:scale-110 w-40 flex-shrink-0 bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"> Log In (Not Yet) </button> */}
            </div>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3 className="text-xl text-white">How to Play</h3>
                <p className="mt-4 text-white">Guess the SWE word in 6 tries. After each guess, press "Enter" and the color of the tiles will change to show how close your guess was to the word. </p> <br></br> 

                <p className="mt-2 text-white">A green tile indicates a correct letter and correct position: </p> <br></br>
                <img src={correctImage} alt="Correct" />

                <p className="mt-2 text-white">A yellow tile indicates a correct letter, but an incorrect position: </p> <br></br>
                <img src={presentImage} alt="Present" />

                <p className="mt-2 text-white">A red tile indicates an incorrect letter not found in the answer: </p> <br></br>
                <img src={wrongImage} alt="Wrong" />
                
                <p className="mt-2 text-white"> Try to match all the tiles to green within 6 tries! </p>

            </Popup>

            <div className="flex justify-center items-center mt-24">
                <p className="text-white font-sans">Created by Jonathan Oh</p>
            </div>
        </div>
    );
};

export default Home;
