import React, { useState, useRef, useEffect } from 'react';
import './LandingPageStyles/LandingPageProducts.css';
import LandingPageCards from './LandingPageComponents/LandingPageCards';
import ScrollToTop from '../Utils/ScrollToTop';

const LandingPageProducts = () => {
  // Scroll to top upon navigating to this component
  ScrollToTop();

  const [inventoryData, setInventoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for the search term
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterWrapper = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/KampBJ-api/server/fetchInventoryProducts.php`) // Update with your actual URL
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

  // Filter inventory data based on the search term
  const filteredData = inventoryData.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='landing-page-products'>
      <div className='landing-page-products__content-wrapper'>
        <div className='landing-page-products__header'>
          <div className='landing-page-products__search-field-wrapper'>
            <input
              type='text'
              placeholder='Search a product...'
              className='landing-page-products__input-search'
              value={searchTerm} // Bind input value to searchTerm
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            />
          </div>
        </div>
        <div className='landing-page-products__body'>
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
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
