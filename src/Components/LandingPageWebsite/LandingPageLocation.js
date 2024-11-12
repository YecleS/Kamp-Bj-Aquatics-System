import React from 'react';
import '../Styles/LandingPageLocation.css'

const LandingPageLocation = () => {
  return (
    <section className='landing-page-location' id='location'>
      <div className='landing-page-location__map-container'>
        <iframe className='landing-page-location__map'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1932.7489659967794!2d121.04844958231672!3d14.340570992956005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d7fc4166b881%3A0xcfa1cdf06f9f8353!2sKAMP%20BJ%20AQUATICS!5e0!3m2!1sen!2sph!4v1718583706062!5m2!1sen!2sph"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
      </div>
    </section>
  )
}

export default LandingPageLocation
