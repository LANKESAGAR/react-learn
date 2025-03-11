import { useState, useEffect } from "react"
import {v4 as uuid4} from 'uuid';
import { useParams, useNavigate } from "react-router-dom";

export default function Definition() {

    const [word, setWord] = useState([]);
    let {search} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
            .then((response) => {
                if(response.status === 404){
                    navigate('/404');
                }
                return response.json()

            })
            .then((data) => {
                setWord(data[0].meanings)
                console.log(data[0].meanings)
            });
    }, [])
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
            })} </>
        ): null}
        </>);
}