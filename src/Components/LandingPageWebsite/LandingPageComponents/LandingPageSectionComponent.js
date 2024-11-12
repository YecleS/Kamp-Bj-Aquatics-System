import React from 'react';
import '../LandingPageStyles/LandingPageSectionComponent.css'

const LandingPageSectionComponent = ({ sectionId, sectionTitle, sectionSubtitle, children }) => {
  return (
    <section className='landing-page-section-component' id={sectionId}>
        <div className='landing-page-section-component__content-wrapper'>
            <div className='landing-page-section-component__header'>
                <h3 className='landing-page-section-component__title'>
                  {sectionTitle}
                </h3>
                <p className='landing-page-section-component__sub-title'>{sectionSubtitle}</p>
            </div>
            <div className='landing-page-section-component__body'>
                {children}
            </div>
        </div>
    </section>
  )
}

export default LandingPageSectionComponent
