import React from 'react';
import '../LandingPageStyles/LandingPageSocialIcons.css'

const LandingPageSocialIcons = ({link, icon , varietyClass}) => {
  return (
    <a href={link} target='blank' className={`landing-page-social-icons__icon-wrapper ${varietyClass}`}>
        <i className={`landing-page-social-icons__icon fa-brands ${icon}`}></i>
    </a>
  )
}

export default LandingPageSocialIcons
