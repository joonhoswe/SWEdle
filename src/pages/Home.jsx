import React from 'react';
import  "../output.css"; // figure styling out...
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Popup from "../components/Popup.js";
import { useState } from 'react';

import Game from "./Game.jsx";

const Home = () => {
    let navigate = useNavigate();

    const goToGame = () => {
        navigate('/Game');
    };

    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div className="bg-gray-900 flex flex-col justify-center items-center h-screen">
            <h1 className="text-white text-7xl font-sans mb-5">SWEdle</h1>
            <h2 className="text-gray-400 text-2xl font-sans mb-1">Get 6 chances to guess a 5-letter</h2>
            <h2 className="text-gray-400 text-2xl font-sans mb-2">SWE (Software Engineering) word.</h2>

            
            <div className="flex justify-center items-center space-x-6 mt-8">
                    <button onClick = {() => setButtonPopup(true)} class = "hover:scale-125 w-32 flex-shrink-0 bg-yellow-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none"> How to Play </button>
                    <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                        <h3> my popup </h3>
                    </Popup>
                    <button class = "hover:scale-125 w-32 flex-shrink-0 bg-green-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none" onClick={goToGame}> Play! </button>
                    <button class = "hover:scale-125 w-32 flex-shrink-0 bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none" onClick={goToGame}> Log In </button>
            </div>

            <div className="flex justify-center items-center space-x-1 mt-14">
                <p className="text-gray-400 font-sans"> Created by </p>
                <p className="text-white font-sans"> Jonathan Oh </p>
            </div>
        </div>
    );
};

export default Home;

