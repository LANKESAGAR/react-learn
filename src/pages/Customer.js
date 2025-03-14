import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom"
import NotFound from "../components/NotFound";

export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [notFound, setNotFound] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) return; 
        const url = `http://localhost:8000/api/customer/${id}`;
        fetch(url)
            .then((response) => {
                if(response.status === 404){
                    setNotFound(true);
                }
                response.json()
            })
            .then((data) => {
                setCustomer(data.customer);
            })
            .catch((error) => console.error("Error fetching customer:", error));
    }, [id]); 

    return (
        <>
        {notFound ? <p>The customer with id {id} is not found</p> : null}
            {customer ? <div>
                <p>{customer.id}</p>
                <p>{customer.name}</p>
                <p>{customer.industry}</p>
            </div> : null}
            <Link to='/customers'>Go Back</Link>
        </>
    );
}
