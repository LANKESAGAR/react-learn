import { useState, useEffect } from "react";

export default function UseFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return; // Prevent fetching if URL is not available

        console.log("Fetching data from:", url); // Debugging line

        setLoading(true);
        setError(null);

        fetch(url)
            .then((response) => {
                console.log("Response status:", response.status); // Debugging line

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data); // Debugging line
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err); // Debugging line
                setError(err.message);
                setLoading(false);
            });

    }, [url]);

    return { data, error, loading };
}
