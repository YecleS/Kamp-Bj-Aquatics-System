import { useState } from 'react';
import './App.css';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Pages/Login';
import SignUp from './Components/Pages/SignUp';
import Owner from './Components/Pages/Home';
import SystemAdmin from './Components/Pages/SystemAdmin';
import LandingPage from './Components/LandingPageWebsite/LandingPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/SA/*' element={<SystemAdmin />} />
          <Route path='/home/*' element={<Owner />} />

        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
