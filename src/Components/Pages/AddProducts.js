import React, { useState, useRef, useEffect } from 'react';
import AddProductModal from '../UIComponents/AddProductModal';
import EditProductModal from '../UIComponents/EditProductModal';
import '../Styles/AddProducts.css';
import VoidedProductsModal from '../UIComponents/VoidedProductsModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';

const AddProducts = () => {
  const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
  const[isAddModalOpen, isSetAddModalOpen] = useState(false)
  const[isEditModalOpen, isSetEditModalOpen] = useState(false)
  const[isVoidModalOpen, isSetVoidModalOpen] = useState(false)
  const filterDropdownRef = useRef(null)

  //Initial Values For Filters Store In useState
  const[filters, setFilters] = useState({
    filterBy: '',
  })


  //Empty Object to Store the Collected Values from the Rows to useState
  //To be Passed To EditProductModal.js
  const [editModalInitialValues, setEditModalInitialValues] = useState({
    product: '',
    brand: '',
    model: '',
    quantity: '',
    price: '',
  });

  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  }

  const toggleAddModal = () => {
    isSetAddModalOpen(!isAddModalOpen);
  }

  const toggleVoidModal = () => {
    isSetVoidModalOpen(!isVoidModalOpen);
  }

  const toggleEditModal = () => {
    isSetEditModalOpen(!isEditModalOpen);

    //When the Edit Modal Is Closed
    //This Will Clear All the Collected Values
    //To Clear Up the Memory
    if(isEditModalOpen) {
      setEditModalInitialValues({
        name: '',
        brand: '',
        model: '',
        quantity: '',
        price: '',
      });   
    }
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
    { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 320, price: 25},
    { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 32, price: 25},
    { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , quantity: 323, price: 25},
  ]


  //Handle the Edit Click Event
  //Note the rest of the method except for toggleEditModal()
  //Can be removed because it was just a trial to see the process of passing of data
  //From table to EditModal upon clicking on a specific rows
  const handleEditClick = (event, products) => {
    
    //Destructure the Values Collected from Products And Store Them in Individual Containers
    const { product, brand, model, quantity, price } = products;

    //Store the Values in the Object To Update The State
    setEditModalInitialValues({
      product: product,
      brand: brand,
      model: model,
      quantity: quantity,
      price: price,
    });

    //Open the Edit Modal
    toggleEditModal();
  }

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
                <th className='add-products__table-th'>Brand</th>
                <th className='add-products__table-th'>Model</th>
                <th className='add-products__table-th'>Quantity</th>
                <th className='add-products__table-th'>Price</th>
                <th className='add-products__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((products =>
                  <tr className='add-products__table-tr' key={products.id} >
                    <td className='add-products__table-td'>{products.product}</td>
                    <td className='add-products__table-td'>{products.brand}</td>
                    <td className='add-products__table-td'>{products.model}</td>
                    <td className='add-products__table-td'>{products.quantity}</td>
                    <td className='add-products__table-td'>{products.price}</td>
                    <td className='add-products__table-td'>
                      <UpdateIcon onClick={(event) => handleEditClick(event, products)}/>
                      <i className="add-products__icon-td fa-solid fa-square-xmark" onClick={toggleVoidModal}></i>
                      <DeleteIcon onClick={() => {}}/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && <EditProductModal onClick={toggleEditModal} initialValues={editModalInitialValues}/>}
      {isVoidModalOpen && <VoidedProductsModal onClick={toggleVoidModal}/>}
    </div>
  )
}

export default AddProducts
