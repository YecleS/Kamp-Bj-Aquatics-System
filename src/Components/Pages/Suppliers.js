import React, {useRef, useState, useEffect} from 'react';
import '../Styles/Suppliers.css';
import AddSupplierModal from '../UIComponents/AddSupplierModal';
import EditSupplierModal from '../UIComponents/EditSupplierModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';

const Suppliers = () => {
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
    isSetEditModalOpen(!isEditModalOpen)
  }

  // Dummy Data For Table 
  const supplierData = [
    { id: 1, supplier: 'oSideMafia', goods:'Aquariums', email:'oside@gmail.com', contact: '092312345631', location:'San pedro'},
    { id: 2, supplier: 'Hev Abi', goods:'Substrates', email:'hevabi@gmail.com', contact: '092312345631', location:'San pedro'},
    { id: 3, supplier: 'spaker corps', goods:'Aquarium Rocks', email:'spaker@gmail.com', contact: '092312345631', location:'San pedro'},
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
    })
  }

  
  return (
    <div className='suppliers'>
      <div className='suppliers__header'>
      <div className='suppliers__left-controls-wrapper'>
          <div className='suppliers__search-wrapper'>
            <input type='text' placeholder='Search' className='suppliers__input-field'/>
          </div>
          <div className='suppliers__filter-wrapper' ref={filterDropdownRef}>
            <i className="suppliers__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='suppliers__filter-dropdown'>
                <div className='suppliers__filter-dropdown-body'>
                  <div className='suppliers__filter-dropdown-field-wrapper'>
                    <p className='suppliers__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='suppliers__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='date' >Date</option>
                      <option value='price' >Total</option>
                    </select>
                  </div>
                </div>
                <div className='suppliers__filter-dropdown-footer'>
                  <p className='suppliers__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='suppliers__right-controls-wrapper'>
          <button className='suppliers__insert' onClick={toggleAddModal}><i className="suppliers__insert-icon fa-solid fa-plus"></i></button>
          {isAddModalOpen && <AddSupplierModal onClick={toggleAddModal} />}
        </div>
      </div>
      <div className='suppliers__body'>
        <div className='suppliers__table-wrapper'>
          <table className='suppliers__table'>
            <thead>
              <tr>
                <th className='suppliers__table-th'>Supplier</th>
                <th className='suppliers__table-th'>Goods</th>
                <th className='suppliers__table-th'>Email</th>
                <th className='suppliers__table-th'>Contacts</th>
                <th className='suppliers__table-th'>Location (City)</th>
                <th className='suppliers__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier =>
                  <tr className='suppliers__table-tr' key={supplier.id} >
                    <td className='suppliers__table-td'>{supplier.supplier}</td>
                    <td className='suppliers__table-td'>{supplier.goods}</td>
                    <td className='suppliers__table-td'>{supplier.email}</td>
                    <td className='suppliers__table-td'>{supplier.contact}</td>
                    <td className='suppliers__table-td'>{supplier.location}</td>
                    <td className='suppliers__table-td'>
                      <UpdateIcon onClick={toggleEditModal}/>
                      <DeleteIcon onClick={()=> {}}/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && <EditSupplierModal onClick={toggleEditModal}/>}
    </div>
  )
}

export default Suppliers
