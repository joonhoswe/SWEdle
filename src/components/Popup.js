import React from "react"
import "../index.css"

function Popup(props) {
  return (props.trigger) ? (
    <div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-1/3 h-4/5 p-4 shadow-lg rounded-lg">
            <button onClick={() => props.setTrigger(false)} className="absolute top-3 right-3 bg-red-500 text-white transition duration-300 ease-in-out hover:bg-red-600 hover:scale-110 p-2 rounded-md">  
            Close 
            </button>
            {props.children}
        </div>
    </div>
  ) : "";
} 

export default Popup