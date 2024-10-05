import React, { useState } from 'react';
import '../Styles/BrandAndCategories.css';
import BrandModel from './BrandModel';
import Categories from './Categories';

const BrandAndCategories = () => {
    const [activeButton, setActiveButton] = useState('brand');

    const activeStates = {
        'brand': <BrandModel />,
        'categories': <Categories />
    }
    

  return (
    <div className='brand-categories'>
      <div className='brand-categories__header'>
          <button className={`brand-categories__control-button ${activeButton === 'brand' ? 'brand-categories__control-button-active': ''}`} onClick={()=> setActiveButton('brand')}>Brands & Models</button>
          <button className={`brand-categories__control-button ${activeButton === 'categories' ? 'brand-categories__control-button-active': ''}`} onClick={()=> setActiveButton('categories')}>Categories</button>
      </div>

      <div className='brand-categories__body'>
        {activeStates[activeButton]}
      </div>
    </div>
  )
}

export default BrandAndCategories
