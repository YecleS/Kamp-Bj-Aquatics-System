import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/OwnerSidebar.css';
import { SidebarLink, SidebarDropdownLink } from './SidebarLink';

const SystemAdminSidebar = () => {
    const location = useLocation();
    return (
        <SidebarLink 
            to='/SA/user-request'
            className={location.pathname === '/SA/user-request' ? 'sidebar-link-active' : ''}
            onClick={() => {}}
            icon={<i className="sidebar-link__nav-icon fa-solid fa-user"></i>}
            item='User Request'
        />
    )
}

export default SystemAdminSidebar;