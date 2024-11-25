import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import '../Styles/Owner.css';
import Header from '../UIComponents/Header';
import Sidebar from '../UIComponents/HomeSidebar';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import AddProducts from './AddProducts';
import VoidProducts from './VoidProducts';
import Pos from './Pos';
import Sales from './Sales';
import BusinessExpenses from './BusinessExpenses';
import RestockProducts from './RestockProducts';
import Suppliers from './Suppliers';
import GeneralLedger from './GeneralLedger';
import RoleManagement from './RoleManagement';
import UserRequest from './UserRequest';
import Users from './Users';
import RestockRecords from './RestockRecords';
import BrandAndCategories from './BrandAndCategories';
import Welcome from './Welcome';
import ProductLog from './ProductLog';
import UserManagementLog from './UserManagementLog';
import ProductBatch from './ProductBatch';
import Reports from './Reports';
import ReportsSales from './ReportsSales';
import ReportsInventory from './ReportsInventory';
import ReportsExpenses from './ReportsExpenses';


const Owner = () => {
  const[isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const hamburgerMenuRef = useRef();
  const sidebarRef = useRef();

  //Close the sidebar everytime the url changes based on the route
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  //Close the sidebar if it was clicked outside the sidebar
  useEffect(() => {
    const handleClickOutsideOfSidebar = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(e.target) && isSidebarOpen ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutsideOfSidebar);
    return () => document.removeEventListener('click', handleClickOutsideOfSidebar);
  }, [isSidebarOpen]);

  //To toggle the sidebar, for responsiveness purposes
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
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
            <Route path='user-management_Logs' element={<UserManagementLog />}/>
            <Route path='reports' element={<Reports />} />
            <Route path='ledger' element={<GeneralLedger />}/>
            <Route path='reports-inventory' element={<ReportsInventory />}/>
            <Route path='reports-sales' element={<ReportsSales />}/>
            <Route path='reports-expenses' element={<ReportsExpenses />}/>
            <Route path='view-batch/:productId' element={<ProductBatch />}/>
          </Routes> 
        </main>
      </div>
    </div>
  )
}

export default Owner
