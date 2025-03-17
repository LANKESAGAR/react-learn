import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
    const [customers, setCustomers] = useState([]); 
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching...');
        const url = baseurl + 'api/customers/';
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname || "/",
                        },
                    });
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                if (data) setCustomers(data.customers || []);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, [navigate, location.pathname]); 

    function newCustomer(name, industry) {
        const data = { name: name, industry: industry };
        const url = baseurl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                toggleShow();
                console.log(data);
                setCustomers((prevCustomers) => [...prevCustomers, data.customer]);
            })
            .catch((e) => console.log(e));
    }

    return (
        <>
            <h1>Here are our customers:</h1>

            {customers.length > 0 ? (
                customers.map((customer) => (
                    <div className="m-2" key={customer.id}>
                        <Link to={"/customer/" + customer.id}>
                            <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                {customer.name}
                            </button>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No customers found.</p>
            )}

            <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>
    );
}
