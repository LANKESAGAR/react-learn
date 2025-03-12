import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dictionary(){
    const [word, setWord] = useState('');
    const navigate = useNavigate();

    return(
    <form className="flex justify-center space-x-2 max-w-[300px] " onSubmit={()=>{
        navigate('/definition/' + word);
    }}>
        <input 
            className="shrink min-w-0 px-2 py-1 rounded border-2 border-purple-600" 
            type="text" 
            placeholder="Type Keyword" 
            onChange={(e)=>{
                setWord(e.target.value);
            }}/>

        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">Search</button>
        </form>
    )
}