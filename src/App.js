import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuid4} from 'uuid';
import AddEmployee from './components/AddEmployee copy';
import EditEmployee from './components/EditEmployee';
import Header from './components/Header';
import Employees from './pages/Employees';

function App() {
  
  return <Employees />

}

export default App;
