import { useState, useEffect } from "react"
import {v4 as uuid4} from 'uuid';
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../components/NotFound";

export default function Definition() {

    const [word, setWord] = useState([]);
    const [notFound, setNotFound] = useState(false);
    let {search} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
            .then((response) => {
                if(response.status === 404){
                    setNotFound(true);
                }
                return response.json()

            })
            .then((data) => {
                if (data && Array.isArray(data) && data.length > 0 && data[0].meanings) {
                    setWord(data[0].meanings);
                    console.log(data[0].meanings);
                  } else {
                    setNotFound(true); // Handle unexpected API responses
                  }
            })
            .catch((error) => {
                console.error("Error fetching definition:", error);
                setNotFound(true);
              });
    }, [search])

    if(notFound){
        return (
            <>
            <NotFound />
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
            })} </>
        ): null}
        </>);
}