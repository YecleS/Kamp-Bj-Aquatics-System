import React, { useState } from 'react';
import '../Styles/BrandAndCategories.css';
import BrandModel from './BrandModel';
import Categories from './Categories';

const BrandAndCategories = () => {
    const [activeButton, setActiveButton] = useState('categories');

    const activeStates = {
        'categories': <Categories />,
        'brand': <BrandModel />
    }
    

  return (
    <div className='brand-categories'>
      <div className='brand-categories__header'>
        <button className={`brand-categories__control-button ${activeButton === 'categories' ? 'brand-categories__control-button-active': ''}`} onClick={()=> setActiveButton('categories')}>Categories</button>
          <button className={`brand-categories__control-button ${activeButton === 'brand' ? 'brand-categories__control-button-active': ''}`} onClick={()=> setActiveButton('brand')}>Brands</button>
      </div>

      <div className='brand-categories__body'>
        {activeStates[activeButton]}
      </div>
    </div>
  )
}

export default BrandAndCategories
