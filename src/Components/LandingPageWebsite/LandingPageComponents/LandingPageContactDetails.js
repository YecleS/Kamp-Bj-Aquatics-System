import React from 'react';
import '../LandingPageStyles/LandingPageContactDetails.css'

const LandingPageContactDetails = ({icon, title, details}) => {
  return (
    <div className='landing-page-contact-details'>
        <div className='landing-page-contact-details__icon-wrapper'>
            <i className={`landing-page-contact-details__icon fa-solid ${icon}`}></i>
        </div>
        <div className='landing-page-contact-details__information-wrapper'>
            <p className='landing-page-contact-details__title'>{title}</p>
            <p className='landing-page-contact-details__description'>
               {details}
            </p>
        </div>
    </div>
  )
}

export default LandingPageContactDetails
