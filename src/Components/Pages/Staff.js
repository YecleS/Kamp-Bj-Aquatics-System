import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import '../Styles/Staff.css';
import Header from '../UIComponents/Header';
import StaffSidebar from '../UIComponents/StaffSidebar';
import Dashboard from '../Pages/Dashboard';
import Inventory from '../Pages/Inventory';
import AddProducts from '../Pages/AddProducts';
import Pos from '../Pages/Pos';
import Sales from './Sales';
import Utilities from '../Pages/Utilities';
import RestockProducts from '../Pages/RestockProducts';
import Expenses from './Expenses';


const Staff = () => {
  const[isSidebarOpen, setIsSidebarOpen] = useState(false)

  //To toggle the sidebar, for responsiveness purposes
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className='staff'>
      <header className='staff__header'>
        <Header onClick={toggleSidebar}/>
      </header>
      <div className='staff__body'>
        <aside className= {`staff__sidebar ${isSidebarOpen ? 'active-sidebar':''}`}>
          <StaffSidebar />
        </aside>
        <main className='staff__main'>
          <Routes>
            <Route index element={<Dashboard />}/>
            <Route path='inventory' element={<Inventory />}/>
            <Route path='add-products' element={<AddProducts />}/>
            <Route path='pos' element={<Pos />}/>
            <Route path='sales-record' element={<Sales />}/>
            <Route path='utilities' element={<Utilities />}/>
            <Route path='restock-products' element={<RestockProducts />}/>
            <Route path='expenses-record' element={<Expenses />}/>
          </Routes> 
        </main>
      </div>
    </div>
  )
}

export default Staff
