import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { baseurl } from "../shared";

export default function Customers() {
    const [customers, setCustomers] = useState();
    useEffect(() => {
        console.log('Fetching...')
        const url = baseurl + 'api/customers/';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.customers);
            });
    }, []);
    return (
        <>
            <h1>Here are our customers</h1>
            <ul>
            {customers ? customers.map((customer) => {
                return(
                    
                        <li key={customer.id}>
                            <Link to={"/customer/" + customer.id}>{customer.name}</Link>
                        </li>
              
                )

            }) : null
            }
                  </ul>
        </>

    );
}