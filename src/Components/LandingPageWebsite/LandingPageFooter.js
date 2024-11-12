import React from 'react';
import './LandingPageStyles/LandingPageFooter.css'
import LandingPageSocialIcons from './LandingPageComponents/LandingPageSocialIcons';
import Logo from '../Assets/logo.png';
import LandingPageNavigationLink from './LandingPageComponents/LandingPageNavigationLink';
import { NavLink } from 'react-router-dom';

const LandingPageFooter = () => {
  return (
    <div className='landing-page-footer'>
      <div className='landing-page-footer__content-wrapper'>
        <div className='landing-page-footer__content-first-section'>
          <div className='landing-page-footer__logo-wrapper'>
            <img src={Logo} className='landing-page-footer__logo-img' />
            <p className='landing-page-footer__logo-text'>Kamp BJ<br/>Aquatics</p>
          </div>
          <div className='landing-page-footer__social-icons-wrapper'>
            <LandingPageSocialIcons
              link='https://www.facebook.com/search/top?q=kamp%20bj%20aquatics' 
              icon='landing-page-footer__social-icon fa-facebook-f'
              varietyClass='landing-page-footer__social-icon-link'
            />
            <LandingPageSocialIcons
              link='https://www.tiktok.com/@kampbjaquatics?lang=en' 
              icon='landing-page-footer__social-icon fa-tiktok'
              varietyClass='landing-page-footer__social-icon-link'
            />
            <LandingPageSocialIcons
              link='https://www.instagram.com/kamp.bj.3/' 
              icon='landing-page-footer__social-icon fa-instagram'
              varietyClass='landing-page-footer__social-icon-link'
            />
          </div>
        </div>
        <div className='landing-page-footer__content-second-section'>
          <p className='landing-page-footer__contact-title'>Contact Us</p>
          <div className='landing-page-footer__contact-details-wrapper'>
            <p className='landing-page-footer__contact-details'>0965 760 9399</p>
            <p className='landing-page-footer__contact-details'>yeclasteven85@gmail.com</p>
            <p className='landing-page-footer__contact-details'>Block 33 Lot 12 Our Lady Of La Naval Street, Rosario Complex 4023 San Pedro, Philippines</p>
          </div>
        </div>
        <div className='landing-page-footer__content-third-section'>
          <p className='landing-page-footer__quick-links-title'>Quick Links</p>
          <div className='landing-page-footer__quick-links-wrapper'>
            <NavLink to='/login' className='landing-page-footer__quick-links'>KampBjAquatics.com</NavLink>
              <LandingPageNavigationLink linkPath='/' label='Home' varietyClass='landing-page-footer__quick-links'/>
              <LandingPageNavigationLink linkPath='/products' label='Products' varietyClass='landing-page-footer__quick-links'/>
              <LandingPageNavigationLink linkPath='/contacts' label='Contacts' varietyClass='landing-page-footer__quick-links'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPageFooter
