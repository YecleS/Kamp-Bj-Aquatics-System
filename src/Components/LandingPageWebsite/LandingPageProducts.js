import React, { useState, useRef, useEffect } from 'react';
import './LandingPageStyles/LandingPageProducts.css';
import LandingPageCards from './LandingPageComponents/LandingPageCards';
import Product1 from '../Assets/product1.jpg';
import ScrollToTop from '../Utils/ScrollToTop';

const LandingPageProducts = () => {
    //Scroll to top upon navigating to this component
    ScrollToTop();

    const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState();
    const filterWrapper = useRef();

    const products = [
        { id: 1, img: Product1, name: 'Tempered Glass Aquarium', description: 'A durable and crystal-clear aquarium made with tempered glass.', price: 44.5 },
        { id: 2, img: Product1, name: 'LED Aquarium Light', description: 'Bright and energy-efficient LED light for aquariums.', price: 84.8 },
        { id: 3, img: Product1, name: 'Submersible Water Heater', description: 'Efficient water heater with adjustable temperature settings.', price: 144.2 },
        { id: 4, img: Product1, name: 'Fish Food Pellets', description: 'Nutritious pellets suitable for most freshwater fish.', price: 244.3 },
        { id: 5, img: Product1, name: 'Aquarium Gravel Cleaner', description: 'Manual siphon cleaner to remove debris from aquarium gravel.', price: 19.9 },
        { id: 6, img: Product1, name: 'CO2 Diffuser Kit', description: 'Essential kit for healthy plant growth in aquariums.', price: 59.5 },
        { id: 7, img: Product1, name: 'External Canister Filter', description: 'High-capacity filter for large aquariums.', price: 299.0 },
        { id: 8, img: Product1, name: 'Aquarium Plant Fertilizer', description: 'Liquid fertilizer to promote healthy aquatic plants.', price: 15.5 },
        { id: 9, img: Product1, name: 'Automatic Fish Feeder', description: 'Convenient feeder with customizable feeding schedules.', price: 65.0 },
        { id: 10, img: Product1, name: 'Aquarium Air Pump', description: 'Silent and efficient air pump for oxygenating aquariums.', price: 32.9 },
        { id: 11, img: Product1, name: 'Magnetic Glass Cleaner', description: 'Easy-to-use magnetic cleaner for aquarium glass.', price: 25.3 },
        { id: 12, img: Product1, name: 'Aquarium Background Poster', description: 'Decorative background poster for aquarium aesthetics.', price: 12.0 },
        { id: 13, img: Product1, name: 'Aquarium Driftwood', description: 'Natural driftwood piece to enhance the aquarium environment.', price: 18.7 },
        { id: 14, img: Product1, name: 'Aquarium Test Kit', description: 'Complete kit for testing water parameters like pH and ammonia.', price: 35.0 },
        { id: 15, img: Product1, name: 'Aquarium Substrate Sand', description: 'Fine sand substrate for planted aquariums.', price: 21.0 }
    ];

    const toggleFilterDropdown = () => {
        isSetFilterDropdownOpen(!isFilterDropdownOpen);
    }

    useEffect(() => {
        const handleClick = (e) => {
          if(filterWrapper.current && !filterWrapper.current.contains(e.target)){
            isSetFilterDropdownOpen(false);
          }
        }
        document.addEventListener('click', handleClick);
  
        return() => document.removeEventListener('click', handleClick);
    }, [])



  return (
    <div className='landing-page-products'>
      <div className='landing-page-products__content-wrapper'>
        <div className='landing-page-products__header'>
        <div className='landing-page-products__search-field-wrapper'>
            <input type='text' placeholder='Search a product..' className='landing-page-products__input-search' />
          </div>
          <div className='landing-page-products__filter-wrapper' ref={filterWrapper}>
            <div className='landing-page-products__filter-icon-wrapper' onClick={toggleFilterDropdown} ref={filterWrapper}>
              <i className="landing-page-products__filter-icon fa-solid fa-filter"></i>
            </div>
            {isFilterDropdownOpen && 
                <div className='landing-page-products__filter-dropdown-wrapper'>
                  <p className='landing-page-products__filter-dropdown-title'>Sort By:</p>
                  <select className='landing-page-products__filter-field' defaultValue=''>
                    <option value='' disabled hidden>Price</option>
                    <option value='low-to-high'>Price: Low to High</option>
                    <option value='high-to-low'>Price: High to Low</option>
                  </select>
                </div>
              }
          </div>
        </div>
        <div className='landing-page-products__body'>
            {products.map(products =>(
                <LandingPageCards key={products.id} id={products.id} image={products.img} name={products.name} description={products.description} price={products.price} />
            ))}
        </div>    
      </div>
    </div>
  )
}

export default LandingPageProducts
