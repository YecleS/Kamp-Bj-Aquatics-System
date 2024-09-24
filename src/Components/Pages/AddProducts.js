import React, { useState, useRef, useEffect } from 'react';
import AddProductModal from '../UIComponents/AddProductModal';
import EditProductModal from '../UIComponents/EditProductModal';
import '../Styles/AddProducts.css';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';
import { ViewProductIcon } from '../UIComponents/ActionIcons';
import TextSlicer from '../Utils/TextSlicer';

const AddProducts = () => {
  const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
  const[isAddModalOpen, isSetAddModalOpen] = useState(false)
  const[isEditModalOpen, isSetEditModalOpen] = useState(false)
  const filterDropdownRef = useRef(null)

  //Initial Values For Filters Store In useState
  const[filters, setFilters] = useState({
    filterBy: '',
  })

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  }

  const toggleAddModal = () => {
    isSetAddModalOpen(!isAddModalOpen);
  }

  const toggleEditModal = () => {
    isSetEditModalOpen(!isEditModalOpen);
  }


  // Handle Closing of Dropdowns When Clicked Outside of Its Div 
  useEffect(() => {
    let handler = (e) => {
      if(filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)){
        isSetFilterDropdownOpen(false);
      }
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);


  // Dummy Data For Table 
  const productsData = [
    { id: 1, 
      product: 'gatoradesd blue 25ml', 
      description:'Stay refreshed and energized with Gatorade Blue. Packed in a convenient 25ml bottle, this sports drink is designed to replenish essential electrolytes lost during physical activity, keeping you hydrated and ready to perform at your best.', 
      brand: 'Oishi', 
      model: '3XCCS5', 
      quantity: 320,
      procured: 15.25,
      markup: 10,
      price: 25.30
    },

    { id: 2, 
      product: 'TANGINANG CAPSTONE TO', 
      description: "Quench your thirst and fuel your performance with Gatorade Blue. This compact 25ml bottle is packed with electrolytes to help you stay hydrated and maintain peak performance during intense physical activity.", 
      brand: 'Hayp', 
      model: '1XCCS5', 
      quantity: 100,
      procured: 10.25,
      markup: 15,
      price: 40.30
    },
  ]


  //Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
    })
  }

  return (
    <div className='add-products'>

      <div className='add-products__header'>
        <div className='add-products__left-controls-wrapper'>
          <div className='add-products__search-wrapper'>
            <input type='text' placeholder='Search' className='add-products__input-field'/>
          </div>
          <div className='add-products__filter-wrapper' ref={filterDropdownRef}>
            <i className="add-products__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='add-products__filter-dropdown'>
                <div className='add-products__filter-dropdown-body'>
                  <div className='add-products__filter-dropdown-field-wrapper'>
                    <p className='add-products__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='add-products__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                </div>
                <div className='add-products__filter-dropdown-footer'>
                  <p className='add-products__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='add-products__right-controls-wrapper'>
          <button className='add-products__insert' onClick={toggleAddModal}><i className="add-products__insert-icon fa-solid fa-plus"></i></button>
          {isAddModalOpen && <AddProductModal onClick={toggleAddModal}/>}
        </div>
      </div>

      <div className='add-products__body'>
        <div className='add-products__table-wrapper'>
          <table className='add-products__table'>
            <thead>
              <tr>
                <th className='add-products__table-th'>Name</th>
                <th className='add-products__table-th'>Description</th>
                <th className='add-products__table-th'>Brand</th>
                <th className='add-products__table-th'>Model</th>
                <th className='add-products__table-th'>Quantity</th>
                <th className='add-products__table-th'>Procured Price</th>
                <th className='add-products__table-th'>Markup %</th>
                <th className='add-products__table-th'>Selling Price</th>
                <th className='add-products__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((products =>
                  <tr className='add-products__table-tr' key={products.id} >
                    <td className='add-products__table-td'>{products.product}</td>
                    <td className='add-products__table-td'><TextSlicer text={products.description} /></td>
                    <td className='add-products__table-td'>{products.brand}</td>
                    <td className='add-products__table-td'>{products.model}</td>
                    <td className='add-products__table-td'>{products.quantity} pcs</td>
                    <td className='add-products__table-td'>{products.procured}</td>
                    <td className='add-products__table-td'>{products.markup} %</td>
                    <td className='add-products__table-td'>{products.price}</td>
                    <td className='add-products__table-td'>
                      <UpdateIcon onClick={toggleEditModal}/>
                      <ViewProductIcon products={products}/>
                      <DeleteIcon onClick={() => {}}/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && <EditProductModal onClick={toggleEditModal}/>}
    </div>
  )
}

export default AddProducts
