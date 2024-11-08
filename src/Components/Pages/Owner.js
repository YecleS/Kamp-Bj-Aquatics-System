import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import '../Styles/Owner.css';
import Header from '../UIComponents/Header';
import Sidebar from '../UIComponents/OwnerSidebar';
import Dashboard from '../Pages/Dashboard';
import Inventory from '../Pages/Inventory';
import AddProducts from '../Pages/AddProducts';
import VoidProducts from '../Pages/VoidProducts';
import Pos from '../Pages/Pos';
import Sales from './Sales';
import BusinessExpenses from './BusinessExpenses';
import RestockProducts from '../Pages/RestockProducts';
import Suppliers from '../Pages/Suppliers';
import SalesReport from '../Pages/SalesReport';
import ExpensesReport from '../Pages/ExpensesReport';
import GeneralLedger from '../Pages/GeneralLedger';
import RoleManagement from './RoleManagement';
import UserRequest from './UserRequest';
import Users from './Users';
import RestockRecords from '../Pages/RestockRecords';
import BrandAndCategories from './BrandAndCategories';
import Welcome from './Welcome';
import ProductLog from './ProductLog';


const Owner = () => {
  const[isSidebarOpen, setIsSidebarOpen] = useState(false)

  //To toggle the sidebar, for responsiveness purposes
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className='owner'>
      <header className='owner__header'>
        <Header onClick={toggleSidebar}/>
      </header>
      <div className='owner__body'>
        <aside className= {`owner__sidebar ${isSidebarOpen ? 'active-sidebar':''}`}>
          <Sidebar />
        </aside>
        <main className='owner__main'>
          <Routes>
            <Route index element={<Welcome />}/>
            <Route path='dashboard' element={<Dashboard />}/>
            <Route path='inventory' element={<Inventory />}/>
            <Route path='add-products' element={<AddProducts />}/>
            <Route path='brand-categories' element={<BrandAndCategories />} />
            <Route path='void-products' element={<VoidProducts />}/>
            <Route path='Product-Logs' element={<ProductLog />}/>
            <Route path='pos' element={<Pos />}/>
            <Route path='sales-record' element={<Sales />} />
            <Route path='expenses' element={<BusinessExpenses />}/>
            <Route path='restock-products' element={<RestockProducts />}/>
            <Route path='restock-records' element={<RestockRecords />}/>
            <Route path='suppliers' element={<Suppliers />}/>
            <Route path='role-management' element={<RoleManagement />}/>
            <Route path='user-request' element={<UserRequest />}/>
            <Route path='users' element={<Users />}/>
            <Route path='sales-report' element={<SalesReport />}/>
            <Route path='expenses-report' element={<ExpensesReport />}/>
            <Route path='ledger' element={<GeneralLedger />}/>
          </Routes> 
        </main>
      </div>
    </div>
  )
}

export default Owner
