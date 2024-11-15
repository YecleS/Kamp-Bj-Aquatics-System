import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import UserRequest from './UserRequest';
import Header from '../UIComponents/Header';
import Sidebar from '../UIComponents/SystemAdminSidebar';
import Welcome from './Welcome';
import '../Styles/Owner.css';
const SystemAdmin = () => {
  const[isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const hamburgerMenuRef = useRef();
  const sidebarRef = useRef();

  //Close the sidebar everytime the url changes based on the route
  // useEffect(() => {
  //   setIsSidebarOpen(false);
  // }, [location]);

  //Close the sidebar if it was clicked outside the sidebar
  // useEffect(() => {
  //   const handleClickOutsideOfSidebar = (e) => {
  //     if (sidebarRef.current && !sidebarRef.current.contains(e.target) && hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(e.target) && isSidebarOpen ) {
  //       setIsSidebarOpen(false);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutsideOfSidebar);
  //   return () => document.removeEventListener('click', handleClickOutsideOfSidebar);
  // }, [isSidebarOpen]);

  //To toggle the sidebar, for responsiveness purposes
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

    return(
        <div className='owner'>
      <header className='owner__header'>
        <Header onClick={toggleSidebar} hamburgerMenuRef={hamburgerMenuRef}/>
      </header>
      <div className='owner__body'>

        <aside className= {`owner__sidebar ${isSidebarOpen ? 'active-sidebar':''}`} ref={sidebarRef}>
          <Sidebar />
        </aside>

        <main className='owner__main'>
          <Routes>
            <Route index element={<Welcome />}/>
            <Route path='user-request' element={<UserRequest />}/>
          </Routes> 
        </main>
      </div>
    </div>
    )
};

export default SystemAdmin;