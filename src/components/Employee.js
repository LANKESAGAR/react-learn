import EditEmployee from "./EditEmployee";

function Employee(props) {
    return (
        <div className="min-w-[350px] max-w-[350px] m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:flex sm:items-center sm:space-y0 sm:space-x-6">
            <img className="object-cover rounded-full h-[100px] w-[100px] mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
                 src={props.img}
                 alt="Face card" />
            <div className="space-y-2 text-center sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg font-semibold text-black">{props.name}</p>
                    <p className="font-medium text-gray-500">{props.role}</p>
                </div>
                <EditEmployee 
                    id={props.id}
                    name={props.name} 
                    role={props.role} 
                    updateEmployee={props.updateEmployee}
                />
            </div>
        </div>
    );
}

export default Employee;