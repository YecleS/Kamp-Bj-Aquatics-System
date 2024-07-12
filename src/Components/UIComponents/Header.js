import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Header.css';
import Logo from '../Assets/logo.png';
import Notification from './Notification';

const Header = ({onClick}) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
    const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false)
    
    const profileDropdownRef = useRef(null);
    const notifDropdownRef = useRef(null);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
        setIsNotifDropdownOpen(false);
    }

    const toggleNotifDropdown = () => {
        setIsNotifDropdownOpen(!isNotifDropdownOpen);
        setIsProfileDropdownOpen(false);
    }

    //To handle the clicking outside of the dropdown
    //Basically when the dropdown is active and when the user clicked outside of the dropdown it will automatically close by itself
    useEffect(() => {
      let handler = (e) => {
          if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
            setIsProfileDropdownOpen(false);
          }
          if(notifDropdownRef.current && !notifDropdownRef.current.contains(e.target)) {
            setIsNotifDropdownOpen(false)
          }
      };
      document.addEventListener("click", handler);

      return () => {
        document.removeEventListener("click", handler);
    };
  }, []);
    

  return (
    <div className='header'>
      <div className='header__logo-wrapper'>
        <i className="header__hamburger-menu fa-solid fa-bars" onClick={onClick}></i>
        <img src={Logo} className='header__logo-img' />
        <p className='header__logo-text'>Kamp BJ Aquatics</p>
      </div>
      <div className='header__controls-wrapper'>
        <div className='header__notification-wrapper' ref={notifDropdownRef}> 
            <i className="header__notification-icon fa-solid fa-bell" onClick={toggleNotifDropdown}></i>
            {isNotifDropdownOpen && <Notification/>}
        </div>
        <div className='header__profile-wrapper' onClick={toggleProfileDropdown} ref={profileDropdownRef}>
            <i className="header__user-icon fa-solid fa-user"></i>
            <p className='header__name'>Admin</p>
            <i className="header__arrow-icon fa-solid fa-caret-down"></i>
            {isProfileDropdownOpen &&
                <div className='header__profile-dropdown' >
                  <p className='header__dropdown-name'>Admin</p>
                  <NavLink to='/' className='header__navLink' ><li className='header__link'>Logout</li></NavLink>
                </div>
            }         
        </div>
      </div>
    </div>
  )
}

export default Header
