import './index.css';
import Header from './components/Header';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customer from './pages/Customer';
import Login from './pages/Login';
import { createContext, useState } from 'react';

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  function changeLoggedIn(value){
    setLoggedIn(value);
    if(value === false){
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/definition/:search' element={<Definition />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/customer/:id' element={<Customer />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Header>
    </BrowserRouter>
    </LoginContext.Provider>

  );
}

export default App;
