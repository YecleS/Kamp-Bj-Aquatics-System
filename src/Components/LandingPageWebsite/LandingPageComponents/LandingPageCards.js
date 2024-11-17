import React from 'react';
import '../LandingPageStyles/LandingPageCards.css';
import { Link } from 'react-router-dom';
import TextSlicer from '../../Utils/TextSlicer';

const LandingPageCards = ({ product }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  // Check if product exists before rendering
  if (!product) {
    return <p>Loading...</p>; // Or return null to render nothing until product is defined
  }

  const encodedItemName = encodeURIComponent(product.productName);
  const imageUrl = `${apiUrl}/KampBJ-api/server/uploads/products/${product.image}`;

  return (
    <Link to={`/product-view/${product.productId}/${encodedItemName}`} className='cards__link'>
      <div className='landing-page-cards'>
        <div className='landing-page-cards__header'>
          <img src={imageUrl} className='landing-page-cards__img' alt={product.productName} />
        </div>
        <div className='landing-page-cards__body'>
          <div className='landing-page-cards__title-wrapper'>
            <h5 className='landing-page-cards__title'>{product.productName}</h5>
            <p className='landing-page-cards__description'><TextSlicer text={product.description} /></p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LandingPageCards;
