import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './LandingPageStyles/LandingPageHeader.css'
import Logo from '../Assets/logo.png';
import NavigationLink from './LandingPageComponents/LandingPageNavigationLink';

const LandingPageHeader = () => {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    const navBarRef = useRef(null);

    const toggleHeader = () => {
        setIsHeaderOpen(!isHeaderOpen);
    }

    const closeHeader = () => {
        setIsHeaderOpen(false);
    }

    useEffect(() =>{
        const handleClick = (e) => {
        if(navBarRef.current && !navBarRef.current.contains(e.target)) {
            setIsHeaderOpen(false);
        }
    };
    
    document.addEventListener('click', handleClick);
    return() => document.removeEventListener('click', handleClick);

    }, []);

    useEffect(() => {
        const handleScroll = () => {
        const header = document.querySelector('.landing-page-header');

        if(window.scrollY > 0){
            header.classList.add('scrolled');
        }else {
            header.classList.remove('scrolled');
        }
    }

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className='landing-page-header'>
        <div className='landing-page-header__content-wrapper'>
            <div className='landing-page-header__logo-wrapper'>
                <img src={Logo} alt='logo' className='landing-page-header__logo-img'></img>
                <p className='landing-page-header__logo-text'>Kamp BJ <br/> Aquatics</p>
            </div>
            <div className='landing-page-header__navigation-wrapper' ref={navBarRef}>
              <i className="landing-page-header__hamburger-menu fa-solid fa-bars" onClick={toggleHeader}></i>
              <nav className={`landing-page-header__nav-links-wrapper ${isHeaderOpen? 'landing-page-header__nav-active':''}`} >
              <i className="landing-page-header__close-menu fa-solid fa-xmark" onClick={toggleHeader}></i>
              <NavigationLink 
                linkPath='/'
                label="Home"
                onClick={closeHeader}
              />
              <NavigationLink
                linkPath='/products'
                label="Products"
                onClick={closeHeader}
              />
              <NavigationLink
                linkPath='/contacts' 
                label="Contacts"
                onClick={closeHeader}
              />
              </nav>
            </div>
        </div>
    </div>
  )
}

export default LandingPageHeader
