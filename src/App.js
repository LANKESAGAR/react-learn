import './App.css';
import Employee from './components/Employee';

function App() {
  console.log("We are about to list the employees");
  const showEmployees = true;
  let content;
  if(showEmployees){
    content = <Employee />
  }else{
    content = <p>You are not allowed to see employees</p>
  }
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
