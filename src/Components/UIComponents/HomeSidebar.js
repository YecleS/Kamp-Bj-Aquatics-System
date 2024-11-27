import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/OwnerSidebar.css';
import { SidebarLink, SidebarDropdownLink } from './SidebarLink';

const OwnerSidebar = () => {
    const [isProductsDropdownOpen, isSetProductsDropdownOpen] = useState(false);
    const [isSalesDropdownOpen, isSetSalesDropdownOpen] = useState(false);
    const [isReportDropdownOpen, isSetReportDropdownOpen] = useState(false);
    const [isUserManagementDropdownOpen, isSetUsermanagementDropdownOpen] = useState(false);
    const [isInventoryManagementDropdownOpen, isSetInventoryManagementDropdownOpen] = useState(false);
    const [access, setAccess] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();

    useEffect(() => {
        const roleId = localStorage.getItem('roleId'); // Or from session storage
    
        if (!roleId) {
            console.error("Role ID is missing in local storage");
            return;
        }
    
        fetch(`${apiUrl}/KampBJ-api/server/fetchAccessFromRoleId.php?roleId=${roleId}`, {
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
        isSetInventoryManagementDropdownOpen(false);
    }

    const toggleInventoryDropdown = () => {
        isSetInventoryManagementDropdownOpen(!isInventoryManagementDropdownOpen);
        // Close Other Dropdown Menu
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
        isSetInventoryManagementDropdownOpen(false);
    }

    const toggleSalesDropdown = () => {
        isSetSalesDropdownOpen(!isSalesDropdownOpen);
        // Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
        isSetInventoryManagementDropdownOpen(false);
    }

    const toggleUserManagementDropdown = () => {
        isSetUsermanagementDropdownOpen(!isUserManagementDropdownOpen);
        // Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetReportDropdownOpen(false);
        isSetInventoryManagementDropdownOpen(false);
        isSetSalesDropdownOpen(false);
    }

    const toggleReportDropdown = () => {
        isSetReportDropdownOpen(!isReportDropdownOpen);
        // Close Other Dropdown Menu
        isSetProductsDropdownOpen(false);
        isSetSalesDropdownOpen(false);
        isSetUsermanagementDropdownOpen(false);
        isSetInventoryManagementDropdownOpen(false);
    }

    const renderSidebarLinks = () => {
        return (
            <>
                    <SidebarLink 
                        to='/home'
                        className={location.pathname === '/home' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-house"></i>}
                        item='Welcome Page'
                    />
                {access.includes(1) && (
                    <SidebarLink 
                        to='/home/dashboard'
                        className={location.pathname === '/home/dashboard' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-chart-simple"></i>}
                        item='Dashboard'
                    />
                )}
                {access.includes(2) && (
                    <SidebarDropdownLink 
                        onClick={toggleInventoryDropdown}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-box-open"></i>}
                        item='Inventory Management'
                    />
                    
                )}
                {
                    isInventoryManagementDropdownOpen &&
                        (
                            <div className='owner-sidebar__dropdown-wrapper'>
                                <SidebarLink 
                                    to='/home/inventory'
                                    className={location.pathname === '/home/inventory' ? 'sidebar-link-active' : ''}
                                    onClick={() => {}}
                                    icon={<i className="sidebar-link__nav-icon fa-solid fa-box-archive"></i>}
                                    item='Inventory'
                                /> 
                                <SidebarLink 
                                    to='void-products'
                                    className={location.pathname === '/home/void-products' ? 'sidebar-link-active' : ''}
                                    onClick={() => {}}
                                    icon={<i className="sidebar-link__nav-icon fa-solid fa-square-xmark"></i>}
                                    item='Voided Products'
                                />
                                <SidebarLink 
                                    to='restock-products'
                                    className={location.pathname === '/home/restock-products' ? 'sidebar-link-active' : ''}
                                    onClick={() => {}}
                                    icon={<i className="sidebar-link__nav-icon fa-solid fa-truck-ramp-box"></i>}
                                    item='Restock Products'
                                />
                                <SidebarLink 
                                    to='restock-records'
                                    className={location.pathname === '/home/restock-records' ? 'sidebar-link-active' : ''}
                                    onClick={() => {}}
                                    icon={<i className="sidebar-link__nav-icon fa-solid fa-receipt"></i>}
                                    item='Restock Records'
                                />
                            </div>
                        )
                    
                }
                    
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
                            to='/home/add-products'
                            className={location.pathname === '/home/add-products' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-boxes-packing"></i>}
                            item='Add Products'
                        />
                        <SidebarLink 
                            to='/home/brand-categories'
                            className={location.pathname === '/home/brand-categories' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-layer-group"></i>}
                            item='Brand & Categories'
                        />
                        <SidebarLink 
                            to='Product-Logs'
                            className={location.pathname === '/home/Product-Logs' ? 'sidebar-link-active' : ''}
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
                            to='/home/pos'
                            className={location.pathname === '/home/pos' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-money-bill-transfer"></i>}
                            item='POS'
                        />
                        <SidebarLink 
                            to='/home/sales-record'
                            className={location.pathname === '/home/sales-record' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-receipt"></i>}
                            item='Sales Record'
                        />
                    </div>
                )}
                {access.includes(5) && (
                    <SidebarLink 
                        to='/home/expenses'
                        className={location.pathname === '/home/expenses' ? 'sidebar-link-active' : ''}
                        onClick={closeDropdowns}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-plug"></i>}
                        item='Business Expenses'
                    />
                )}
                {access.includes(6) && (
                    <SidebarLink 
                        to='/home/suppliers'
                        className={location.pathname === '/home/suppliers' ? 'sidebar-link-active' : ''}
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
                            to='/home/role-management'
                            className={location.pathname === '/home/role-management' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-people-group"></i>}
                            item='Role Management'
                        />
                        <SidebarLink 
                            to='/home/user-request'
                            className={location.pathname === '/home/user-request' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-user"></i>}
                            item='User Request'
                        />
                        <SidebarLink 
                            to='users'
                            className={location.pathname === '/home/users' ? 'sidebar-link-active': ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-users"></i>}
                            item='Users'
                        />
                        <SidebarLink 
                            to='user-management_Logs'
                            className={location.pathname === '/home/user-management_Logs' ? 'sidebar-link-active': ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-regular fa-newspaper"></i>}
                            item='Management Logs'
                        />
                    </div>
                )}
                {access.includes(8) && (
                    <SidebarDropdownLink 
                        onClick={toggleReportDropdown}
                        icon={<i className="sidebar-link__nav-icon fa-solid fa-file-circle-check"></i>}
                        item='Reports'
                    />
                )}
                {isReportDropdownOpen && (
                    <div className='owner-sidebar__dropdown-wrapper'>
                        <SidebarLink 
                            to='/home/reports-inventory'
                            className={location.pathname === '/home/reports-inventory' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-file-circle-check"></i>}
                            item='Inventory Report'
                        />
                        <SidebarLink 
                            to='/home/reports-sales'
                            className={location.pathname === '/home/reports-sales' ? 'sidebar-link-active' : ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-file-circle-check"></i>}
                            item='Sales Report'
                        />
                        <SidebarLink 
                            to='/home/reports-expenses'
                            className={location.pathname === '/home/reports-expenses' ? 'sidebar-link-active': ''}
                            onClick={() => {}}
                            icon={<i className="sidebar-link__nav-icon fa-solid fa-file-circle-check"></i>}
                            item='Expenses Report'
                        />
                    </div>
                )}
                {access.includes(9) && (
                    <SidebarLink 
                        to='/home/ledger'
                        className={location.pathname === '/home/ledger' ? 'sidebar-link-active' : ''}
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
