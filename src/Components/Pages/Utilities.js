import React, {useRef, useState, useEffect} from 'react';
import '../Styles/Utilities.css';
import AddUtilitiesModal from '../UIComponents/AddUtilitiesModal';
import EditUtilitiesModal from '../UIComponents/EditUtilitiesModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import { ViewExpensesIcon } from '../UIComponents/ActionIcons';
import TextSlicer from '../Utils/TextSlicer';

const Utilities = () => {
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
  const utilitiesData = [
    { id: 1, name: 'wifi', description:'Paid wifi bill for PLDT home communication', date: '10/28/2002', time:'11:23', price: 1150.50 },
    { id: 2, name: 'Water Bill', description:'Paid Water bill for village water supply', date: '11/27/2007', time:'12:23', price: 150.50 },
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
    <div className='utilities'>

      <div className='utilities__header'>
        <div className='utilities__left-controls-wrapper'>
          <div className='utilities__search-wrapper'>
            <input type='text' placeholder='Search' className='utilities__input-field'/>
          </div>
          <div className='utilities__filter-wrapper' ref={filterDropdownRef}>
            <i className="utilities__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='utilities__filter-dropdown'>
                <div className='utilities__filter-dropdown-body'>
                  <div className='utilities__filter-dropdown-field-wrapper'>
                    <p className='utilities__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='utilities__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='date' >Date</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                  <div className='utilities__filter-dropdown-field-wrapper'>
                    <p className='utilities__filter-label'>Starting Date</p>
                    <input type='date' value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}  className='utilities__filter-field'/>
                    <p className='utilities__filter-label'>To</p>
                    <input type='date'value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}  className='utilities__filter-field'/>
                  </div>
                </div>
                <div className='utilities__filter-dropdown-footer'>
                  <p className='utilities__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='utilities__right-controls-wrapper'>
          <button className='utilities__insert'><i className="utilities__insert-icon fa-solid fa-plus" onClick={toggleAddModal}></i></button>
          {isAddModalOpen && <AddUtilitiesModal onClick={toggleAddModal}/>}
        </div>
      </div>

      <div className='utilities__body'>
      <div className='utilities__table-wrapper'>
          <table className='utilities__table'>
            <thead>
              <tr>
                <th className='utilities__table-th'>Name</th>
                <th className='utilities__table-th'>Description</th>
                <th className='utilities__table-th'>Date</th>
                <th className='utilities__table-th'>Time</th>
                <th className='utilities__table-th'>Total</th>
                <th className='utilities__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {utilitiesData.map((utilities =>
                  <tr className='utilities__table-tr' key={utilities.id} >
                    <td className='utilities__table-td'>{utilities.name}</td>
                    <td className='utilities__table-td'><TextSlicer text={utilities.description} /></td>
                    <td className='utilities__table-td'>{utilities.date}</td>
                    <td className='utilities__table-td'>{utilities.time}</td>
                    <td className='utilities__table-td'>₱ {utilities.price}</td>
                    <td className='utilities__table-td'>
                      <UpdateIcon onClick={toggleEditModal}/>
                      <ViewExpensesIcon expenses={utilities} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && <EditUtilitiesModal onClick={toggleEditModal} />}
    </div>
  )
}

export default Utilities
