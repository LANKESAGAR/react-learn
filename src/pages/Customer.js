import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom"
import NotFound from "../components/NotFound";
import { baseurl } from "../shared";
import { LoginContext } from "../App";

export default function Customer() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (!customer) return;
        if (!customer) return;
        let equal = true;
        if (customer.name !== tempCustomer.name) {
            equal = false;
        }
        if (customer.industry !== tempCustomer.industry) {
            equal = false;
        }
        if (equal) {
            setChanged(false);
        }
    },[customer, tempCustomer]);

    useEffect(() => {
        if (!id) return;
        const url = baseurl + 'api/customer/' + id;
        fetch(url,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true);
                }else if(response.status === 401){
                    setLoggedIn(false);
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname || "/",
                        },
                    })
                }

                if (!response.ok) throw new Error('Something went wrong');

                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer);
                setTempCustomer(data.customer);
                setError(undefined);
            })
            .catch((e) => setError(e.message || "An error occurred"));
    }, [id]);

    function updateCustomer(e) {
        e.preventDefault();
        const url = baseurl + 'api/customer/' + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(tempCustomer),
        })
            .then((response) => {
                if(response.status === 401){
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname || "/",
                        },
                    })
                }
                if (!response.ok) throw new Error('Something went wrong');
                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer);
                setChanged(false);
                setError(undefined);
            }).catch((e) => {
                setError(e.message);
            })
    }

    return (
        <div className="p-3">
            {notFound ? <p>The customer with id {id} is not found</p> : null}
            {customer ? <div>
                <form className="w-full max-w-sm" id="customer" onSubmit={updateCustomer}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label for="name">Name</label>
                        </div>
                        <div className="md:w-3/4">
                            <input
                                id="name"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type='text' value={tempCustomer.name}
                                onChange={(e) => {
                                    setChanged(true);
                                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                                }} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label for="industry">Industry</label>
                        </div>
                        <div className="md:w-3/4">
                            <input id="industry"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type='text' value={tempCustomer.industry}
                                onChange={(e) => {
                                    setChanged(true);
                                    setTempCustomer({ ...tempCustomer, industry: e.target.value });
                                }} />
                        </div>
                    </div>
                </form>
                {changed ? <div className="mb-2">
                    <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-2 rounded"
                    onClick={(e) => {
                        setTempCustomer({ ...customer });
                        setChanged(false);
                    }}>Cancel </button>
                    <button form="customer" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" >
                        Save</button>
                </div> : null}
                <div>
                <button className="bg-red-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {
                        const url = baseurl + '/api/customer/' + id;
                        fetch(url, {
                            method: 'DELETE', 
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + localStorage.getItem('access')
                            }
                        })
                            .then((response) => {
                                if(response.status === 401){
                                    navigate('/login', {
                                        state: {
                                            previousUrl: location.pathname || "/",
                                        },
                                    })
                                }
                                if (!response.ok) {
                                    throw new Error('Something went wrong')
                                }
                                navigate('/customers');
                            })
                            .catch((e) => {
                                setError(e.message || "An error occurred")
                            })
                    }}>Delete</button>
                    </div>
            </div> : null}
            {error ? <p>{error}</p> : null}
            <br />
            <Link 
            to='/customers'>
                <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" >
                ← Go Back
                </button>
                </Link>
        </div>
    );
}