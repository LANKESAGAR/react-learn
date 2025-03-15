import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom"
import { baseurl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow(){
        setShow(!show);
    }

    useEffect(() => {
        console.log('Fetching...')
        const url = baseurl + 'api/customers/';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.customers);
            });
    }, []);

    function newCustomer(name, industry){
        const data = {name:name, industry:industry};
        const url = baseurl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response)=>{
                if(!response.ok){
                    throw new Error('Something went wrong')
                }
                return response.json();
            })
            .then((data)=>{
                toggleShow();
                console.log(data)
                setCustomers([...customers,data.customer]);
            })
            .catch((e)=>{
                console.log(e);
            });
    }
    return (
        <>
            <h1>Here are our customers:</h1>
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
                  <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>

    );
}