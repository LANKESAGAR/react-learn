import './App.css';
import Employee from './components/Employee';

function App() {
  console.log("We are about to list the employees");
  const showEmployees = true;
  
  return (
    <div className="App">
      {console.log(`Inside the return, showEmployees ${showEmployees}`)}
      {showEmployees ?
        <><Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee /></>
        : <p>You are not allowed to see the employees</p>
      }
    </div>
  );
}

export default App;
