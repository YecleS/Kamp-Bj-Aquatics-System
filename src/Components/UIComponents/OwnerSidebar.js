import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/OwnerSidebar.css';
import SidebarLink from './SidebarLink';


const OwnerSidebar = () => {
    const[isProductsDropdownOpen, isSetProductsDropdownOpen] = useState(false)
    const[isSalesDropdownOpen, isSetSalesDropdownOpen] = useState(false)
    const[isExpensesDropdownOpen, isSetExpensesDropdownOpen] = useState(false)
    const[isReportDropdownOpen, isSetReportDropdownOpen] = useState(false)
    const location = useLocation()

    const closeDropdowns = () => {
        isSetProductsDropdownOpen(false);
        isSetSalesDropdownOpen(false);
        isSetExpensesDropdownOpen(false);
        isSetReportDropdownOpen(false);
    }

    const toggleProductsDropdown = () => {
        isSetProductsDropdownOpen(!isProductsDropdownOpen);

        //Close Other Dropdown Menu
        isSetExpensesDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetSalesDropdownOpen(false);
    }

    const toggleSalesDropdown = () => {
        isSetSalesDropdownOpen(!isSalesDropdownOpen);

        //Close Other Dropdown Menu
        isSetProductsDropdownOpen(false)
        isSetExpensesDropdownOpen(false);
        isSetReportDropdownOpen(false);
    }

    const toggleExpensesDropdown = () => {
        isSetExpensesDropdownOpen(!isExpensesDropdownOpen);

        //Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetSalesDropdownOpen(false);
    }

    const toggleReportDropdown = () => {
        isSetReportDropdownOpen(!isReportDropdownOpen);

        //Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetExpensesDropdownOpen(false);
        isSetSalesDropdownOpen(false);
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
        <SidebarLink 
            to='#'
            className={''}
            onClick={toggleProductsDropdown}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-box-open"></i>}
            item='Products'
        />
        {isProductsDropdownOpen && 
            <div className='owner-sidebar__dropdown-wrapper'>
                <SidebarLink 
                    to='add-products'
                    className={location.pathname === '/admin/add-products' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-boxes-packing"></i>}
                    item='Products'
                />
                <SidebarLink 
                    to='void-products'
                    className={location.pathname === '/admin/void-products' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-square-xmark"></i>}
                    item='Voided Products'
                />
            </div>
        }
        <SidebarLink 
            to='#'
            className={''}
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
            to='#'
            className={''}
            onClick={toggleExpensesDropdown}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-box-open"></i>}
            item='Expenses'
        />
        {isExpensesDropdownOpen && 
            <div className='owner-sidebar__dropdown-wrapper'>
                <SidebarLink 
                    to='utilities'
                    className={location.pathname === '/admin/utilities' ? 'sidebar-link-active': ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-plug"></i>}
                    item='Utilities'
                />
                <SidebarLink 
                    to='restock-products'
                    className={location.pathname === '/admin/restock-products' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-truck-ramp-box"></i>}
                    item='Restock Products'
                />
                <SidebarLink 
                    to='expenses-record'
                    className={location.pathname === '/admin/expenses-record' ? 'sidebar-link-active' : ''}
                    onClick={() => {}}
                    icon={<i className="sidebar-link__nav-icon fa-solid fa-receipt"></i>}
                    item='Expenses record'
                />
            </div>
        }
        <SidebarLink 
            to='suppliers'
            className={location.pathname === '/admin/suppliers' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-truck"></i>}
            item='Suppliers'
        />
        <SidebarLink 
            to='role-management'
            className={location.pathname === '/admin/role-management' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-people-group"></i>}
            item='Role Management'
        />
        <SidebarLink 
            to='add-user'
            className={location.pathname === '/admin/add-user' ? 'sidebar-link-active': ''}
            onClick={closeDropdowns}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-user"></i>}
            item='Add User'
        />
        <SidebarLink 
            to='#'
            className={''}
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
