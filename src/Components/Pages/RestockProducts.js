import React, {useRef, useState, useEffect} from 'react';
import '../Styles/RestockProducts.css';
import RestockProductModal from '../UIComponents/RestockProductModal';
import EditRestockProductModal from '../UIComponents/EditRestockProductModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';

const RestockProducts = () => {
  const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
  const[isAddModalOpen, isSetAddModalOpen] = useState(false)
  const[isEditModalOpen, isSetEditModalOpen] = useState(false)
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

  const toggleAddModal = () => {
    isSetAddModalOpen(!isAddModalOpen);
  }

  const toggleEditModal = () => {
    isSetEditModalOpen(!isEditModalOpen)
  }

  // Dummy Data For Table 
  const restockData = [
    { id: 1, product: 'gatoradesd blue 25ml', brand: 'Oishi', model: '3XCCS5' , supplier: 'AquaStudios', date: '10/26/2024', quantity: 32, total: 25},
    { id: 2, product: 'gatoradedd blue 25ml', brand: 'Oishi', model: '3XCCS5' , supplier: 'AquaStudios', date: '10/26/2024', quantity: 5, total: 25},
    { id: 3, product: 'gatoradeee blue 25ml', brand: 'Oishi', model: '3XCCS5' , supplier: 'AquaStudios', date: '10/26/2024', quantity: 10, total: 25},
  ]

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

  //Reset Filters
  const resetFilters = () => {
    setFilters({
      filterBy: '',
      startDate: '',
      endDate: '',
    })
  }

  return (
    <div className='restock-products'>
      <div className='restock-products__header'>
        <div className='restock-products__left-controls-wrapper'>
          <div className='restock-products__search-wrapper'>
            <input type='text' placeholder='Search' className='restock-products__input-field'/>
          </div>
          <div className='restock-products__filter-wrapper' ref={filterDropdownRef}>
            <i className="restock-products__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='restock-products__filter-dropdown'>
                <div className='restock-products__filter-dropdown-body'>
                  <div className='restock-products__filter-dropdown-field-wrapper'>
                    <p className='restock-products__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='restock-products__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='date' >Date</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                  <div className='restock-products__filter-dropdown-field-wrapper'>
                    <p className='restock-products__filter-label'>Starting Date</p>
                    <input type='date' value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}  className='restock-products__filter-field'/>
                    <p className='restock-products__filter-label'>To</p>
                    <input type='date'value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}  className='restock-products__filter-field'/>
                  </div>
                </div>
                <div className='restock-products__filter-dropdown-footer'>
                  <p className='restock-products__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='restock-products__right-controls-wrapper'>
          <button className='restock-products__insert' onClick={toggleAddModal}><i className="restock-products__insert-icon fa-solid fa-plus"></i></button>
          {isAddModalOpen && <RestockProductModal onClick={toggleAddModal}/>}
        </div>
      </div>
      <div className='restock-products__body'>
        <div className='restock-products__table-wrapper'>
          <table className='restock-products__table'>
            <thead>
              <tr>
                <th className='restock-products__table-th'>Name</th>
                <th className='restock-products__table-th'>Brand</th>
                <th className='restock-products__table-th'>Model</th>
                <th className='restock-products__table-th'>supplier</th>
                <th className='restock-products__table-th'>Date</th>
                <th className='restock-products__table-th'>Quantity</th>
                <th className='restock-products__table-th'>Total</th>
                <th className='restock-products__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {restockData.map((restock =>
                  <tr className='restock-products__table-tr' key={restock.id} >
                    <td className='restock-products__table-td'>{restock.product}</td>
                    <td className='restock-products__table-td'>{restock.brand}</td>
                    <td className='restock-products__table-td'>{restock.model}</td>
                    <td className='restock-products__table-td'>{restock.supplier}</td>
                    <td className='restock-products__table-td'>{restock.date}</td>
                    <td className='restock-products__table-td'>{restock.quantity}</td>
                    <td className='restock-products__table-td'>{restock.total}</td>
                    <td className='restock-products__table-td'>
                      <UpdateIcon onClick={toggleEditModal}/>
                      <DeleteIcon onClick={() => {}}/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && <EditRestockProductModal onClick={toggleEditModal}/>}
    </div>
  )
}

export default RestockProducts
