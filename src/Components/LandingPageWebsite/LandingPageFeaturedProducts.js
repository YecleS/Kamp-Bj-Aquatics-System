import React from 'react';
import './LandingPageStyles/LandingPageFeaturedProducts.css';
import Img1 from '../Assets/product1.jpg';
import LandingPageCards from './LandingPageComponents/LandingPageCards';
import LandingPageSectionComponent from './LandingPageComponents/LandingPageSectionComponent';
import LandingPageButton from './LandingPageComponents/LandingPageButton';
import { useNavigate } from 'react-router-dom';

const LandingPageFeaturedProducts = () => {
    const navigate = useNavigate();

    const products = [
        {id: 1,  name: 'Tempered Glass Aquarium', description: 'A durable and crystal-clear aquarium made with tempered glass.',  stocks: '10', price: 44.5},
        {id: 2,  name: 'LED Aquarium Light', description: 'Bright and energy-efficient LED light for aquariums.', stocks: '15', price: 84.8},
        {id: 3,  name: 'Submersible Water Heater', description: 'Efficient water heater with adjustable temperature settings.', stocks: '8', price: 144.2},
        {id: 4,  name: 'Fish Food Pellets', description: 'Nutritious pellets suitable for most freshwater fish.', stocks: '25', price: 244.3}
    ];


  return (
    <LandingPageSectionComponent
        sectionId='product-section'
        sectionTitle='Featured Products'
        sectionSubtitle='View Some Of Our Products'
    >
        <div className='landing-page-featured-products__content-wrapper'>
            {products.map(products =>(
                <LandingPageCards key={products.id} product={products} id={products.id} />
            ))}
            <div className='landing-page-featured-products__button-wrapper'>
                <LandingPageButton label='View More' onClick={() => navigate('/products')}/>
            </div>
        </div>
    </LandingPageSectionComponent>
  )
}

export default LandingPageFeaturedProducts
