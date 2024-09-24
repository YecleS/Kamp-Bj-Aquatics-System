import React, { useState, useRef, useEffect } from 'react';
import '../Styles/VoidProducts.css';
import AddVoidProductModal from '../UIComponents/AddVoidProductModal';

const VoidProducts = () => {
  const [isVoidProductsModalOpen, setIsVoidProductsModalOpen] = useState(false);
  const [isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef(null)
  //Initial Values For Filters Store In useState
  const [filters, setFilters] = useState({
    filterBy: '',
  })

   // Dummy Data For Table 
   const voidedProducts = [
    { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 2, description: 'damaged product'},
    { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 3, description: 'damaged product'},
    { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 1, description: 'damaged product'},
  ]

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  }

  const toggleVoidProuctsModal =() => {
    setIsVoidProductsModalOpen(!isVoidProductsModalOpen);
  }

  //Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
    })
  }

  // Handle Closing of Dropdowns When Clicked Outside of Its Div 
  useEffect(() => {
    let handler = (e) => {
      if(filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        isSetFilterDropdownOpen(false);
      }
    }

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className='void-products'>
      <div className='void-products__header'>
        <div className='void-products__left-controls-wrapper'>
          <div className='void-products__search-wrapper'>
            <input type='text' placeholder='Search' className='void-products__input-field'/>
          </div>
          <div className='void-products__filter-wrapper' ref={filterDropdownRef}>
            <i className="void-products__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='void-products__filter-dropdown'>
                <div className='void-products__filter-dropdown-body'>
                  <div className='void-products__filter-dropdown-field-wrapper'>
                    <p className='void-products__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='void-products__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                </div>
                <div className='void-products__filter-dropdown-footer'>
                  <p className='void-products__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <button className='void-products__insert' onClick={toggleVoidProuctsModal}><i className="add-products__insert-icon fa-solid fa-plus"></i></button>
      </div>
      <div className='void-products__body'>
      <div className='void-products__table-wrapper'>
          <table className='void-products__table'>
            <thead>
              <tr>
                <th className='void-products__table-th'>Name</th>
                <th className='void-products__table-th'>Brand</th>
                <th className='void-products__table-th'>Model</th>
                <th className='void-products__table-th'>Quantity</th>
                <th className='void-products__table-th'>Description</th>
              </tr>
            </thead>
            <tbody>
              {voidedProducts.map((products =>
                  <tr className='void-products__table-tr' key={products.id} >
                    <td className='void-products__table-td'>{products.product}</td>
                    <td className='void-products__table-td'>{products.brand}</td>
                    <td className='void-products__table-td'>{products.model}</td>
                    <td className='void-products__table-td'>{products.quantity}</td>
                    <td className='void-products__table-td'>{products.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isVoidProductsModalOpen && <AddVoidProductModal onClick={toggleVoidProuctsModal} />}
    </div>
  )
}

export default VoidProducts
