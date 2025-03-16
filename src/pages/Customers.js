import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom"
import { baseurl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    const navigate = useNavigate();
    useEffect(() => {
        console.log('Fetching...')
        const url = baseurl + 'api/customers/';
        fetch(url)
            .then((response) => {

                if(response.status === 401){
                    navigate('/login');
                }
                response.json()
            })
            .then((data) => {
                setCustomers(data.customers);
            });
    }, []);

    function newCustomer(name, industry) {
        const data = { name: name, industry: industry };
        const url = baseurl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                return response.json();
            })
            .then((data) => {
                toggleShow();
                console.log(data)
                setCustomers([...customers, data.customer]);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    return (
        <>
            <h1>Here are our customers:</h1>

            {customers ? customers.map((customer) => {
                return (

                    <div className="m-2" key={customer.id}>
                        <Link to={"/customer/" + customer.id}>
                            <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"> 
                                {customer.name}
                            </button>

                        </Link>
                    </div>

                )

            }) : null
            }
            <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>

    );
}