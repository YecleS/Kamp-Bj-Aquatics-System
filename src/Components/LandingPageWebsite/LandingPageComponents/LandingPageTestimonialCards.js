import React from 'react';
import '../LandingPageStyles/LandingPageTestimonialCards.css';

const LandingPageTestimonialCards = ({image, feedback, name}) => {
  return (
    <div className='landing-page-testimonial__cards'>
      <div className='landing-page-testimonial__cards__image-wrapper'>
        <img src={image} className='landing-page-testimonial__cards__img' />
      </div>
      <div className='landing-page-testimonial__cards__feedback-wrapper'>
        <p className='landing-page-testimonial__cards__feedback'>{feedback}</p>
        <p className='landing-page-testimonial__cards__customer-name'>{name}</p>
        <p className='landing-page-testimonial__cards__customer-description'>Certified Kamper !</p>
      </div>
    </div>
  )
}

export default LandingPageTestimonialCards
