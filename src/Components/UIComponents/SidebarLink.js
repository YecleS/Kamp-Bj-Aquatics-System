import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/SidebarLink.css';

export const SidebarLink = ({to, navLinkClassName, className, onClick, icon, item}) => {

    const linkTo = to || '#';

  return (
    <NavLink to={linkTo} className={`sidebar-link__nav-link ${navLinkClassName}`}>
        <li className={`sidebar-link__nav-item ${className}`} onClick={onClick}>
            {icon}
            {item}
        </li>
    </NavLink>
  )
}

export const SidebarDropdownLink = ({className, onClick, icon, item}) => {
  return (
      <li className={`sidebar-dropdown-link__nav-item ${className}`} onClick={onClick}>
          {icon}
          {item}
          <i className="sidebar-dropdown-link__caret-icon fa-solid fa-caret-down"></i>
      </li>
  )
}

