function Employee(props) {
    return (
        <>
            <h3>Employee {props.name}</h3>
            <p>{props.role ? props.role : "No Role Defined"}</p>
            {props.role ? <p className="role">{props.role}</p> : <p className="norole">No Role Defined</p>}
        </>
    );
}

export default Employee;