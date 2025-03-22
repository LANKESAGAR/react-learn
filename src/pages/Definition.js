import { useState, useEffect } from "react"
import {v4 as uuid4} from 'uuid';
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";

export default function Definition() {

    let {search} = useParams();
    const navigate = useNavigate();
    const { 
        data: [{meanings : word}] = [{}],
         errorStatus} = 
         useFetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search);

    useEffect(()=>{
        console.log(word);
    })

    useEffect(()=>{
        console.log('word', word, 'errorStatus', errorStatus);

    })
    
    if(errorStatus === 404){
        return (
            <>
            <NotFound />
            <Link to="/dictionary">Search for Another Word</Link>
            </>
        );
    }
    if(errorStatus){
        return (
            <>
            <p>Something went wrong with server, try again</p>
            <Link to="/dictionary">Search for Another Word</Link>
            </>
        );
    }
    
    return (
        <>
            {word ? (  <>
            <h1>Here is the definition</h1>
            {word.map((meaning) => {

                return (
                    <p key={uuid4()}>
                        {meaning.partOfSpeech + ': '}:
                        {meaning.definitions[0].definition}
                    </p>
                );
            })} 
            <p>Search Again:</p>
            <DefinitionSearch />
            </>
        ): null}
        </>);
}