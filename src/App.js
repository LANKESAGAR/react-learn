import './App.css';
import Employee from './components/Employee';

function App() {
  console.log("We are about to list the employees");
  const showEmployees = true;

  return (
    <div className="App">
      {console.log(`Inside the return, showEmployees ${showEmployees}`)}
      {showEmployees ?
        <>
          <Employee name="sagar" role="Engineer" />
          <Employee name="john" role="Doctor" />
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
