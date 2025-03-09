import '../index.css';
import Employee from '../components/Employee';
import { useState } from 'react';
import {v4 as uuid4} from 'uuid';
import AddEmployee from '../components/AddEmployee copy';
import EditEmployee from '../components/EditEmployee';

function Employees() {
  const [role, setRole] = useState('role');
  const [employees, setEmployees] = useState([
    {
      id: "1",
      name: "caleb", 
      role: "Developer", 
      img: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "2",
      name: "sal", 
      role: "Manager", 
      img: "https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "3",
      name: "blanco", 
      role: "Director", 
      img: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "4",
      name: "Melanie", 
      role: "Software Engineer", 
      img: "https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "5",
      name: "Corey", 
      role: "Devops Engineer", 
      img: "https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: "6",
      name: "Jake", 
      role: "Cloud Engineer", 
      img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },

  ])
  
  function updateEmployee(id, newName, newRole){
    const updatedEmployees = employees.map((employee)=>{
      if(id === employee.id){
        return {...employee, name:newName, role:newRole}
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img){
    const newEmployee = {
      id: uuid4(),
      name:name,
      role:role,
      img:img,
    };
    setEmployees([...employees, newEmployee])
  }

  const showEmployees = true;
  return (
    <div className="App bg-gray-300 min-h-screen">
      {console.log(`Inside the return, showEmployees ${showEmployees}`)}
      {showEmployees ?
        <>
          <div className='flex flex-wrap justify-center my-2'>
            {employees.map((employee)=>{
              const editEmployee = (
                <EditEmployee 
                    id={employee.id}
                    name={employee.name} 
                    role={employee.role} 
                    updateEmployee={updateEmployee}
                />
              );
              return(
                <Employee 
                  key={employee.id}
                  id={employee.id}
                  name={employee.name} 
                  role={employee.role} 
                  img={employee.img} 
                  editEmployee = {editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
        : <p>You are not allowed to see the employees</p>
      }
    </div>
  );
}

export default Employees;
