import React, { useState, useRef, useEffect } from 'react';
import './LandingPageStyles/LandingPageProducts.css';
import LandingPageCards from './LandingPageComponents/LandingPageCards';
import ScrollToTop from '../Utils/ScrollToTop';

const LandingPageProducts = () => {
  // Scroll to top upon navigating to this component
  ScrollToTop();

  const [inventoryData, setInventoryData] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterWrapper = useRef(null);

  useEffect(() => {
    fetch('http://localhost/KampBJ-api/server/fetchInventoryProducts.php') // Update with your actual URL
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setInventoryData(data.data); // Update state with fetched data
        } else {
          alert('No products available');
        }
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (filterWrapper.current && !filterWrapper.current.contains(e.target)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

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
          {inventoryData.length > 0 ? (
            inventoryData.map((product) => (
              <LandingPageCards
                key={product.productId}
                product={product}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageProducts;
