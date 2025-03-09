import { useState, useEffect } from "react"
import {v4 as uuid4} from 'uuid';

export default function Definition() {

    const [word, setWord] = useState([]);

    useEffect(() => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/helicopter')
            .then((response) => response.json())
            .then((data) => {
                setWord(data[0].meanings)
                console.log(data[0].meanings)
            });
    }, [])
    return (
        <>
            <h1>Here is the definition:</h1>
            {word ? word.map((meaning) => {

                return (
                    <p key={uuid4()}>
                        {meaning.partOfSpeech + ': '}:
                        {meaning.definitions[0].definition}
                    </p>
                );
            }) : null}
        </>);
}