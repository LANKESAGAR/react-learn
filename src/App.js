import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuid4} from 'uuid';

function App() {
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
      img: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },

  ])
  
  function updateEmployee(id, newName, newRole){
    const updatedEmployees = employees.map((employee)=>{
      if(id == employee.id){
        return {...employee, name:newName, role:newRole}
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  const showEmployees = true;
  return (
    <div className="App">
      {console.log(`Inside the return, showEmployees ${showEmployees}`)}
      {showEmployees ?
        <>
          <input type='text' onChange={(e) => {
            console.log(e.target.value);
            setRole(e.target.value);
          }}
          />
          <div className='flex flex-wrap justify-center'>
            {employees.map((employee)=>{
              return(
                <Employee 
                  key={employee.id}
                  id={employee.id}
                  name={employee.name} 
                  role={employee.role} 
                  img={employee.img} 
                  updateEmployee = {updateEmployee}
                />
              );
            })}
          </div>
        </>
        : <p>You are not allowed to see the employees</p>
      }
    </div>
  );
}

export default App;
