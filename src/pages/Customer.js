import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import NotFound from "../components/NotFound";
import { baseurl } from "../shared";

export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const navigate = useNavigate();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        console.log('customer', customer);
        console.log('tempCustomer', tempCustomer);
        console.log('changed', changed)
    });

    useEffect(() => {
        if (!id) return;
        const url = baseurl + 'api/customer/' + id;
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true);
                }
                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer);
                setTempCustomer(data.customer);
            })
            .catch((error) => console.error("Error fetching customer:", error));
    }, [id]);

    return (
        <>
            {notFound ? <p>The customer with id {id} is not found</p> : null}
            {customer ? <div>
                <input className='m-2 block px-2' type='text' value={tempCustomer.name}
                    onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({ ...tempCustomer, name: e.target.value })
                    }} />
                <input className='m-2 block px-2' type='text' value={tempCustomer.industry}
                    onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({ ...tempCustomer, industry: e.target.value })
                    }} />
                {changed ? <>
                    <button onClick={(e) =>{
                        setTempCustomer({...customer});
                        setChanged(false);
                    } }>Cancel</button> <button>Save</button>
                </> : null}
            </div> : null}
            <button onClick={(e) => {
                const url = baseurl + '/api/customer/' + id;
                fetch(url, {
                    method: 'DELETE', headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Something went wrong')
                        }
                        navigate('/customers');
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }}>DELETE</button>
            <br />
            <Link to='/customers'>Go Back</Link>
        </>
    );
}