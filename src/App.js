import { useState } from 'react';
import './App.css';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Pages/Login';
import SignUp from './Components/Pages/SignUp';
import Owner from './Components/Pages/Owner';
import Staff from './Components/Pages/Staff';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/admin/*' element={<Owner />} />
          <Route path='/staff/*' element={<Staff />} />
        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
