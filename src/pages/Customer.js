import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (!id) return; 
        const url = `http://localhost:8000/api/customer/${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCustomer(data.customer);
            })
            .catch((error) => console.error("Error fetching customer:", error));
    }, [id]); 

    return (
        <>
            {customer ? <div>
                <p>{customer.id}</p>
                <p>{customer.name}</p>
                <p>{customer.industry}</p>
            </div> : null}
            <Link to='/customers'>Go Back</Link>
        </>
    );
}
