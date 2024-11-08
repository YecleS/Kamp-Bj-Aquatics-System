import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/OwnerSidebar.css';
import { SidebarLink, SidebarDropdownLink } from './SidebarLink';

const OwnerSidebar = () => {
    const [isProductsDropdownOpen, isSetProductsDropdownOpen] = useState(false);
    const [isSalesDropdownOpen, isSetSalesDropdownOpen] = useState(false);
    const [isReportDropdownOpen, isSetReportDropdownOpen] = useState(false);
    const [isUserManagementDropdownOpen, isSetUsermanagementDropdownOpen] = useState(false);
    const [access, setAccess] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const roleId = localStorage.getItem('roleId'); // Or from session storage
    
        if (!roleId) {
            console.error("Role ID is missing in local storage");
            return;
        }
    
        fetch(`http://localhost/KampBJ-api/server/fetchAccessFromRoleId.php?roleId=${roleId}`, {
            method: 'GET',
            credentials: 'include',  // If you need cookies/sessions
        })
        .then(response => response.json())
        .then(data => {
            if (data.access) {
                setAccess(data.access);
            } else {
                console.error('Error fetching access data:', data.error || 'Unknown error');
            }
        })
        .catch(error => {
            console.error("Error fetching access data:", error);
        });
    }, []);
    

    const closeDropdowns = () => {
        isSetProductsDropdownOpen(false);
        isSetSalesDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

    const toggleProductsDropdown = () => {
        isSetProductsDropdownOpen(!isProductsDropdownOpen);
        // Close Other Dropdown Menu
        isSetSalesDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

    const toggleSalesDropdown = () => {
        isSetSalesDropdownOpen(!isSalesDropdownOpen);
        // Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

    const toggleUserManagementDropdown = () => {
        isSetUsermanagementDropdownOpen(!isUserManagementDropdownOpen);
        // Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetReportDropdownOpen(false);
    }

    const toggleReportDropdown = () => {
        isSetReportDropdownOpen(!isReportDropdownOpen);
        // Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetSalesDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
    }

    const renderSidebarLinks = () => {
        return (
            <>
                    <SidebarLink 
                        to='/admin'
                        className={location.pathname === '/admin' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-house"></i>}
                        item='Welcome Page'
                    />
                {access.includes(1) && (
                    <SidebarLink 
                        to='/admin/dashboard'
                        className={location.pathname === '/admin/dashboard' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-chart-simple"></i>}
                        item='Dashboard'
                    />
                )}
                {access.includes(2) && (
                    <SidebarLink 
                        to='/admin/inventory'
                        className={location.pathname === '/admin/inventory' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-box-archive"></i>}
                        item='Inventory'
                    />
                )}
                {access.includes(3) && (
                    <SidebarDropdownLink 
                        onClick={toggleProductsDropdown}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-box-open"></i>}
                        item='Product Management'
                    />
                )}
                {isProductsDropdownOpen && (
                    <div className='owner-sidebar__dropdown-wrapper'>
                        <SidebarLink 
                            to='/admin/add-products'
                            className={location.pathname === '/admin/add-products' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-boxes-packing"></i>}
                            item='Add Products'
                        />
                        <SidebarLink 
                            to='/admin/brand-categories'
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
                        <SidebarLink 
                            to='Product-Logs'
                            className={location.pathname === '/admin/Product-Logs' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-receipt"></i>}
                            item='Product Logs'
                        />
                    </div>
                )}
                {access.includes(4) && (
                    <SidebarDropdownLink 
                        onClick={toggleSalesDropdown}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-coins"></i>}
                        item='Sales'
                    />
                )}
                {isSalesDropdownOpen && (
                    <div className='owner-sidebar__dropdown-wrapper'>
                        <SidebarLink 
                            to='/admin/pos'
                            className={location.pathname === '/admin/pos' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-money-bill-transfer"></i>}
                            item='POS'
                        />
                        <SidebarLink 
                            to='/admin/sales-record'
                            className={location.pathname === '/admin/sales-record' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-receipt"></i>}
                            item='Sales Record'
                        />
                    </div>
                )}
                {access.includes(5) && (
                    <SidebarLink 
                        to='/admin/expenses'
                        className={location.pathname === '/admin/expenses' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-plug"></i>}
                        item='Business Expenses'
                    />
                )}
                {access.includes(6) && (
                    <SidebarLink 
                        to='/admin/suppliers'
                        className={location.pathname === '/admin/suppliers' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-truck"></i>}
                        item='Suppliers'
                    />
                )}
                {access.includes(7) && (
                    <SidebarDropdownLink 
                        onClick={toggleUserManagementDropdown}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-person"></i>}
                        item='User Management'
                    />
                )}
                {isUserManagementDropdownOpen && (
                    <div className='owner-sidebar__dropdown-wrapper'>
                        <SidebarLink 
                            to='/admin/role-management'
                            className={location.pathname === '/admin/role-management' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-people-group"></i>}
                            item='Role Management'
                        />
                        <SidebarLink 
                            to='/admin/user-request'
                            className={location.pathname === '/admin/user-request' ? 'sidebar-link-active' : ''}
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
                )}
                {access.includes(8) && (
                    <SidebarLink 
                        to='/admin/reports'
                        className={location.pathname === '/admin/reports' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-file-circle-check"></i>}
                        item='Report'
                    />
                )}
                {access.includes(9) && (
                    <SidebarLink 
                        to='/admin/ledger'
                        className={location.pathname === '/admin/ledger' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-file-lines"></i>}
                        item='General Ledger'
                    />
                )}
            </>
        );
    }

    return (
        <div className='owner-sidebar'>
            <nav className='owner-sidebar__nav'>
                {renderSidebarLinks()}
            </nav>
        </div>
    )
}

export default OwnerSidebar;
