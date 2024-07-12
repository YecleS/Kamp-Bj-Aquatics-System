import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Inventory.css';

const Inventory = () => {
  const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
  const filterDropdownRef = useRef(null)
  
  //Initial Values For Filters Store In useState
  const[filters, setFilters] = useState({
    filterBy: '',
    startDate: '',
    endDate: '',
  })


  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  }
  

  //Dummy Data 
  const inventoryData = [
    { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , stocks: 30, price: 25},
    { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , stocks: 123, price: 25},
    { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , stocks: 320, price: 25},
  ]
  
  // Handle Closing of Dropdowns When Clicked Outside of Its Div
  useEffect (() => {
    let handler = (e) => {
      if(filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)){
        isSetFilterDropdownOpen(false);
      };
    };
    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);


  //Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
      startDate: '',
      endDate: '',
    })
  }

  return (
    <div className='inventory'>
      <div className='inventory__header'>
        <div className='inventory__search-wrapper'>
          <input type='text' placeholder='Search' className='inventory__input-field'/>
        </div>
        <div className='inventory__filter-wrapper' ref={filterDropdownRef}>
          <i className="inventory__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
          {isFilterDropdownOpen &&
            <div className='inventory__filter-dropdown'>
              <div className='inventory__filter-dropdown-body'>
                  <div className='inventory__filter-dropdown-field-wrapper'>
                    <p className='inventory__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='inventory__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='date' >Date</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                </div>
                <div className='inventory__filter-dropdown-footer'>
                  <p className='inventory__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
            </div>
          }
        </div>
      </div>
      <div className='inventory__body'>
        <div className='inventory__table-wrapper'>
          <table className='inventory__table'>
            <thead>
              <tr>
                <th className='inventory__table-th'>Name</th>
                <th className='inventory__table-th'>Brand</th>
                <th className='inventory__table-th'>Model</th>
                <th className='inventory__table-th'>Stocks</th>
                <th className='inventory__table-th'>Price</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((inventory =>
                <tr className='inventory__table-tr' key={inventory.id} >
                  <td className='inventory__table-td'>{inventory.product}</td>
                  <td className='inventory__table-td'>{inventory.brand}</td>
                  <td className='inventory__table-td'>{inventory.model}</td>
                  <td className='inventory__table-td'>{inventory.stocks}</td>
                  <td className='inventory__table-td'>{inventory.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Inventory
