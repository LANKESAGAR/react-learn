import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditEmployee(props) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState(props.name);
    const [role, setRole] = useState(props.role);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                onClick={handleShow}
                className="px-4 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Update
            </button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        console.log(e);
                        console.log("Hello from edit employee details");
                        console.log(props.id, name, role);
                        console.log(name);
                        props.updateEmployee(props.id, name, role);
                    }}
                    id="editModal" className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inputName">
                                    Full Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="inputName" 
                                type="text" 
                                value={name} 
                                onChange={(e)=>{
                                    setName(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="roleName">
                                    Role
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                id="roleName" 
                                type="text" 
                                value={role} 
                                onChange={(e)=>{
                                    setRole(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
                    <button 
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" 
                        form="editModal"
                    >
                            Update
                        </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditEmployee;