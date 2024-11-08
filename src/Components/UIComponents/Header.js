import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.css';
import Logo from '../Assets/logo.png';
import Notification from './Notification';

const Header = ({ onClick, hamburgerMenuRef }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // For navigation after logout

  const profileDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);

  useEffect(() => {
    // Check if username is stored in localStorage and set it
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    let handler = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target)) {
        setIsNotifDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotifDropdownOpen(false);
  };

  const toggleNotifDropdown = () => {
    setIsNotifDropdownOpen(!isNotifDropdownOpen);
    setIsProfileDropdownOpen(false);
  };

  const logout = async () => {
    // Call the PHP logout script to destroy the session
    try {
      const response = await fetch('http://localhost/KampBJ-api/server/logout.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear localStorage data
        localStorage.removeItem('username');
        localStorage.removeItem('roleId');
        // Redirect to login page
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='header'>
      <div className='header__logo-wrapper'>
        <i className="header__hamburger-menu fa-solid fa-bars" onClick={onClick} ref={hamburgerMenuRef}></i>
        <img src={Logo} className='header__logo-img' />
        <p className='header__logo-text'>Kamp BJ Aquatics</p>
      </div>
      <div className='header__controls-wrapper'>
        <div className='header__notification-wrapper' ref={notifDropdownRef}>
          <i className="header__notification-icon fa-solid fa-bell" onClick={toggleNotifDropdown}></i>
          {isNotifDropdownOpen && <Notification />}
        </div>
        <div className='header__profile-wrapper' onClick={toggleProfileDropdown} ref={profileDropdownRef}>
          <i className="header__user-icon fa-solid fa-user"></i>
          <p className='header__name'>{username || 'Admin'}</p>
          <i className="header__arrow-icon fa-solid fa-caret-down"></i>
          {isProfileDropdownOpen && (
            <div className='header__profile-dropdown'>
              <p className='header__dropdown-name'>{username || 'Admin'}</p>
              <button onClick={logout} className='header__link'>Logout</button> {/* Logout button */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
