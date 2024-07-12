import React from 'react';
import '../Styles/StaffSidebar.css';
import { useLocation } from 'react-router-dom';
import SidebarLink from './SidebarLink';

const StaffSidebar = () => {
    const location = useLocation()
    const isStaffPage = location.pathname.startsWith('/staff');

  return (
    <div className='staff-sidebar'>
      <nav className='staff-sidebar__nav'>
      <SidebarLink 
            to='/staff'
            className={location.pathname === '/staff' ? 'sidebar-link-active': ''}
            onClick={()=>{}}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-chart-simple"></i>}
            item='Dashboard'
        />
        <SidebarLink 
            to='inventory'
            className={location.pathname === '/staff/inventory' ? 'sidebar-link-active': ''}
            onClick={()=>{}}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-box-archive"></i>}
            item='Inventory'
        />
        <SidebarLink 
            to='pos'
            className={location.pathname === '/staff/pos' ? 'sidebar-link-active': ''}
            onClick={() => {}}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-money-bill-transfer"></i>}
            item='POS'
        />
        <SidebarLink 
            to='utilities'
            className={location.pathname === '/staff/utilities' ? 'sidebar-link-active': ''}
            onClick={() => {}}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-plug"></i>}
            item='Utilities'
        />
        <SidebarLink 
            to='restock-products'
            className={location.pathname === '/staff/restock-products' ? 'sidebar-link-active' : ''}
            onClick={() => {}}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-truck-ramp-box"></i>}
            item='Restock Products'
        />       
      </nav>
    </div>
  )
}

export default StaffSidebar
