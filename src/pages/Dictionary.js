import { useState, useEffect } from "react";

export default function Dictionary(){
    const [word, setWord] = useState('');
    const [word2, setWord2] = useState('');

    useEffect(()=>{
        console.log('State Updated', word);
    }, [word]);

    useEffect(()=>{
        console.log('State Updated', word2);
    }, [word2]);

    return(
    <>
        <input type="text" placeholder="Help" onChange={(e)=>{
            setWord(e.target.value);
        }}/>
        <h2>Let's get the definition for {word}</h2>

        <input type="text" placeholder="Help" onChange={(e)=>{
            setWord2(e.target.value);
        }}/>
        <h2>Let's get the definition for {}word2</h2>
    </>
    )
}