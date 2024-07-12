import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/SidebarLink.css';

const SidebarLink = ({to, navLinkClassName, className, onClick, icon, item}) => {

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

export default SidebarLink
