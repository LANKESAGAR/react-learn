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
    const [error, setError] = useState();

    useEffect(() => {
        if(!customer) return;
        if(!customer) return;
        let equal = true;
        if(customer.name !== tempCustomer.name){
            equal = false;
        }
        if(customer.industry !== tempCustomer.industry){
            equal = false;
        }
        if(equal){
            setChanged(false);
        }
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

    function updateCustomer(){
        const url = baseurl + 'api/customer/' + id;
        fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempCustomer),
        })
        .then((response)=>{
            if(!response.ok) throw new Error('Something went wrong');
            return response.json()
        })
        .then((data)=>{
            setCustomer(data.customer);
            setChanged(false);
            console.log(data);
            setError(undefined);
        }).catch((e)=>{
            console.log('e',e);
            setError(e.message);
        })
    }

    return (
        <>
            {notFound ? <p>The customer with id {id} is not found</p> : null}
            {customer ? <div>
                <input className='m-2 block px-2' type='text' value={tempCustomer.name}
                    onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({ ...tempCustomer, name: e.target.value });
                    }} />
                <input className='m-2 block px-2' type='text' value={tempCustomer.industry}
                    onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({ ...tempCustomer, industry: e.target.value });
                    }} />
                {changed ? <>
                    <button className="m-2" onClick={(e) => {
                        setTempCustomer({ ...customer });
                        setChanged(false);
                    }}>Cancel </button> 
                    <button className="m-2" onClick={updateCustomer}>Save</button>
                </> : null}
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
            {error ? <p>{error}</p> : null}
               </div> : null}
            <br />
            <Link to='/customers'>Go Back</Link>
        </>
    );
}