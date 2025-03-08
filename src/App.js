import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('role');
  console.log("We are about to list the employees");
  const showEmployees = true;
  return (
    <div className="App bg-red-300">
      {console.log(`Inside the return, showEmployees ${showEmployees}`)}
      {showEmployees ?
        <>
        <input type='text' onChange={(e)=>{
          console.log(e.target.value);
          setRole(e.target.value);
        }}
        />
          <Employee name="sagar" role="Engineer" />
          <Employee name="john" role={role} />
          <Employee name="roni" role="Lawyer" />
          <Employee name="patty" role="police" />
          <Employee name="Mandy" />
        </>
        : <p>You are not allowed to see the employees</p>
      }
    </div>
  );
}

export default App;
