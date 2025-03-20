import { useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import { useParams, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
    const { search } = useParams();
    const { data: word, error, loading } = useFetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`);

    useEffect(() => {
        console.log("Search term:", search);
        console.log("Fetched Data in Definition.js:", word);
        console.log("Error:", error);
    }, [word, error, search]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <>
                <p>Something went wrong: {error}</p>
                <Link to="/dictionary">Search for Another Word</Link>
            </>
        );
    }

    if (!word || !word[0]?.meanings) {
        return (
            <>
                <NotFound />
                <Link to="/dictionary">Search for Another Word</Link>
            </>
        );
    }

    return (
        <>
            <h1>Here is the definition of "{search}"</h1>
            {word[0].meanings.map((meaning) => (
                <p key={uuid4()}>
                    <strong>{meaning.partOfSpeech}:</strong> {meaning.definitions[0].definition}
                </p>
            ))}
            <p>Search Again:</p>
            <DefinitionSearch />
        </>
    );
}
