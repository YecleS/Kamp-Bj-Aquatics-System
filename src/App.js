import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Pages/Login';
import Owner from './Components/Pages/Owner';
import Staff from './Components/Pages/Staff';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin/*' element={<Owner />} />
          <Route path='/staff/*' element={<Staff />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
