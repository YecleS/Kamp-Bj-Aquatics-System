import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/OwnerSidebar.css';
import { SidebarLink, SidebarDropdownLink } from './SidebarLink';


const OwnerSidebar = () => {
    const[isProductsDropdownOpen, isSetProductsDropdownOpen] = useState(false)
    const[isSalesDropdownOpen, isSetSalesDropdownOpen] = useState(false)
    const[isReportDropdownOpen, isSetReportDropdownOpen] = useState(false)
    const[isUserManagementDropdownOpen, isSetUsermanagementDropdownOpen] = useState(false);
    const location = useLocation()

    const closeDropdowns = () => {
        isSetProductsDropdownOpen(false);
        isSetSalesDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

    const toggleProductsDropdown = () => {
        isSetProductsDropdownOpen(!isProductsDropdownOpen);

        //Close Other Dropdown Menu
        isSetReportDropdownOpen(false);
        isSetSalesDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

    const toggleSalesDropdown = () => {
        isSetSalesDropdownOpen(!isSalesDropdownOpen);

        //Close Other Dropdown Menu
        isSetProductsDropdownOpen(false)
        isSetReportDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

    const toggleUserManagementDropdown = () => {
        isSetUsermanagementDropdownOpen(!isUserManagementDropdownOpen);

        //Close Other Dropdown Menu
        isSetProductsDropdownOpen(false)
        isSetReportDropdownOpen(false);
    }

    const toggleReportDropdown = () => {
        isSetReportDropdownOpen(!isReportDropdownOpen);

        //Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetSalesDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

  return (
    <div className='owner-sidebar'>
      <nav className='owner-sidebar__nav'>
        <SidebarLink 
            to='/admin'
            className={location.pathname === '/admin' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-chart-simple"></i>}
            item='Dashboard'
        />
        <SidebarLink 
            to='inventory'
            className={location.pathname === '/admin/inventory' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-box-archive"></i>}
            item='Inventory'
        />
        <SidebarDropdownLink 
            onClick={toggleProductsDropdown}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-box-open"></i>}
            item='Product Management'
        />
        {isProductsDropdownOpen && 
            <div className='owner-sidebar__dropdown-wrapper'>
                <SidebarLink 
                    to='add-products'
                    className={location.pathname === '/admin/add-products' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-boxes-packing"></i>}
                    item='Add Products'
                />
                <SidebarLink 
                    to='brand-categories'
                    className={location.pathname === '/admin/brand-categories' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-layer-group"></i>}
                    item='Brand & Categories'
                />
                <SidebarLink 
                    to='void-products'
                    className={location.pathname === '/admin/void-products' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-square-xmark"></i>}
                    item='Voided Products'
                />
                <SidebarLink 
                    to='restock-products'
                    className={location.pathname === '/admin/restock-products' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-truck-ramp-box"></i>}
                    item='Restock Products'
                />
                <SidebarLink 
                    to='restock-records'
                    className={location.pathname === '/admin/restock-records' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-receipt"></i>}
                    item='Restock Records'
                />
            </div>
        }
        <SidebarDropdownLink 
            onClick={toggleSalesDropdown}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-coins"></i>}
            item='Sales'
        />
        {isSalesDropdownOpen && 
            <div className='owner-sidebar__dropdown-wrapper'>
                <SidebarLink 
                    to='pos'
                    className={location.pathname === '/admin/pos' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-money-bill-transfer"></i>}
                    item='POS'
                />
                <SidebarLink 
                    to='sales-record'
                    className={location.pathname === '/admin/sales-record' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-receipt"></i>}
                    item='Sales Record'
                />
            </div>
        }
        <SidebarLink 
            to='expenses'
            className={location.pathname === '/admin/expenses' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-plug"></i>}
            item='Business Expenses'
        />
        <SidebarLink 
            to='suppliers'
            className={location.pathname === '/admin/suppliers' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-truck"></i>}
            item='Suppliers'
        />
        <SidebarDropdownLink 
            onClick={toggleUserManagementDropdown}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-person"></i>}
            item='User Management'
        />
        {isUserManagementDropdownOpen &&
            <div className='owner-sidebar__dropdown-wrapper'>
                <SidebarLink 
                    to='role-management'
                    className={location.pathname === '/admin/role-management' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-people-group"></i>}
                    item='Role Management'
                />
                <SidebarLink 
                    to='user-request'
                    className={location.pathname === '/admin/user-request' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-user"></i>}
                    item='User Request'
                />
                <SidebarLink 
                    to='users'
                    className={location.pathname === '/admin/users' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-users"></i>}
                    item='Users'
                />
            </div>
        }
        <SidebarDropdownLink 
            onClick={toggleReportDropdown}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-file-circle-check"></i>}
            item='Report'
        />
        {isReportDropdownOpen && 
            <div className='owner-sidebar__dropdown-wrapper'>
                <SidebarLink 
                    to='sales-report'
                    className={location.pathname === '/admin/sales-report' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-hand-holding-dollar"></i>}
                    item='Sales Report'
                />
                <SidebarLink 
                    to='expenses-report'
                    className={location.pathname === '/admin/expenses-report' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-circle-dollar-to-slot"></i>}
                    item='Expenses Report'
                />
            </div>
        }
        <SidebarLink 
            to='ledger'
            className={location.pathname === '/admin/ledger' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-file-lines"></i>}
            item='General Ledger'
        />
      </nav>
    </div>
  )
}

export default OwnerSidebar
