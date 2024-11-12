import React from 'react';
import { NavLink } from 'react-router-dom';
import '../LandingPageStyles/LandingPageNavigationLink.css';

const LandingPageNavigationLink = ({linkPath, label, onClick, varietyClass}) => {
  return (
    <>
        <NavLink to={linkPath} className='landing-page-navigation-link'>
            <p className={`landing-page-navigation-link__label ${varietyClass}`} onClick={onClick}>{label}</p>
        </NavLink>
    </>
  )
}

export default LandingPageNavigationLink
