import React from 'react';
import '../LandingPageStyles/LandingPageCards.css';
import { Link } from 'react-router-dom';

const LandingPageCards = ({id, image, name, description, stocks, price}) => {
  const encodedItemName = encodeURIComponent(name);
  return (
    <Link to={`/product-view/${id}/${encodedItemName}`} className='cards__link'>
      <div className='landing-page-cards'>
          <div className='landing-page-cards__header'>
              <img src={image} className='landing-page-cards__img'/>
          </div>
          <div className='landing-page-cards__body'>
              <div className='landing-page-cards__title-wrapper'>
                <h5 className='landing-page-cards__title'>{name}</h5>
                <p className='landing-page-cards__description'>{description}</p>
              </div>
              <div className='landing-page-cards__stocks-wrapper'>
                <p className='landing-page-cards__price'>₱ {price}</p>
              </div>       
          </div>
      </div>
    </Link>
  )
}

export default LandingPageCards
