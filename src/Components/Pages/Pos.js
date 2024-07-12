import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Pos.css';
import AddToCartModal from '../UIComponents/AddToCartModal';

const Pos = () => {
    const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
    const[isAddToCartModalOpen, isSetAddToCartOpen] = useState(false)
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

    //Toggle AddToCartModal
    const toggleAddToCartModal = () => {
      isSetAddToCartOpen(!isAddToCartModalOpen);
    }
   

    //Dummy Data 
    const inventoryData = [
        { id: 1, product: 'gatoradesd blue 25ml 326 grams of cocaine', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
        { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , price: 25},
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
    <div className='pos'>
      <div className='pos__header'>
        <div className='pos__search-wrapper'>
            <input type='text' placeholder='Search' className='pos__input-field'/>
         </div>
        <div className='pos__filter-wrapper' ref={filterDropdownRef}>
            <i className="pos__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
                <div className='pos__filter-dropdown'>
                    <div className='pos__filter-dropdown-body'>
                        <div className='pos__filter-dropdown-field-wrapper'>
                            <p className='pos__filter-label'>Filter by</p>
                            <select value={filters.filterBy} 
                            onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                            className='pos__filter-field'
                            >
                                <option></option>
                                <option value='name' >Name</option>
                                <option value='date' >Date</option>
                                <option value='price' >Price</option>
                            </select>
                        </div>
                    </div>
                    <div className='pos__filter-dropdown-footer'>
                    <p className='pos__filter-reset' onClick={resetFilters}>Reset Filters</p>
                    </div>
                </div>
            }
        </div>
      </div>

      <div className='pos__body'>
        <div className='pos__content-wrapper'>
          <div className='pos__inventory-wrapper'>
            <h5 className='pos__table-title'>Inventory</h5>
            <div className='pos__inventory-table-wrapper'>
              <table className='pos__table'>
                <thead>
                  <tr>
                    <th className='pos__table-th'>Name</th>
                    <th className='pos__table-th'>Brand</th>
                    <th className='pos__table-th'>Model</th>
                    <th className='pos__table-th'>Price</th>
                    <th className='pos__table-th'></th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((inventory =>
                    <tr className='pos__table-tr' key={inventory.id} >
                      <td className='pos__table-td'>{inventory.product}</td>
                      <td className='pos__table-td'>{inventory.brand}</td>
                      <td className='pos__table-td'>{inventory.model}</td>
                      <td className='pos__table-td'>{inventory.price}</td>
                      <td className='suppliers__table-td'><i className="pos__icon-td fa-solid fa-cart-shopping" onClick={toggleAddToCartModal}></i></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isAddToCartModalOpen && <AddToCartModal onClick={toggleAddToCartModal}/>}
          </div>

          <div className='pos__orders-wrapper'>
            <h5 className='pos__table-title'>Orders list</h5>
            <div className='pos__orders-table-wrapper'>
              <table className='pos__table'>
                <thead>
                  <tr>
                    <th className='pos__table-th'>Name</th>
                    <th className='pos__table-th'>Brand</th>
                    <th className='pos__table-th'>Model</th>
                    <th className='pos__table-th'>Price</th>
                    <th className='pos__table-th'></th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((inventory =>
                    <tr className='pos__table-tr' key={inventory.id} >
                      <td className='pos__table-td'>{inventory.product}</td>
                      <td className='pos__table-td'>{inventory.brand}</td>
                      <td className='pos__table-td'>{inventory.model}</td>
                      <td className='pos__table-td'>{inventory.price}</td>
                      <td className='suppliers__table-td'><i className="pos__icon-td fa-solid fa-trash"></i></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='pos__orders-details'>
              <div className='pos__billing-details-wrapper'>
                <p className='pos__bill-label'>Sub Total</p>
                <p className='pos__bill-label'>₱ 325.00</p>
              </div>
              <div className='pos__billing-details-wrapper'>
                <p className='pos__bill-label'>Total</p>
                <p className='pos__bill-label'>₱ 325.00</p>
              </div>
              <button className='pos__checkout'>Checkout</button>
            </div>     
          </div>
          
        </div>    
        
      </div>
    </div>
  )
}

export default Pos
