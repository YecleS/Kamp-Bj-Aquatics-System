import React, {useRef, useState, useEffect} from 'react';
import '../Styles/AddUser.css';
import AddStaffModal from '../UIComponents/AddStaffModal';
import EditStaffModal from '../UIComponents/EditStaffModal';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';

const AddUser = () => {
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
  const staffData = [
    { id: 1, fullName: 'steven yecla', username:'steven', role: 'admin'},
    { id: 2, fullName: 'leni labrador', username:'leni', role: 'manager'},
    { id: 3, fullName: 'bekir beks', username:'bekir', role: 'staff'},
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
    <div className='add-user'>
      <div className='add-user__header'>
        <div className='add-user__left-controls-wrapper'>
          <div className='add-user__search-wrapper'>
            <input type='text' placeholder='Search' className='add-user__input-field'/>
          </div>
          <div className='add-user__filter-wrapper' ref={filterDropdownRef}>
            <i className="add-user__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='add-user__filter-dropdown'>
                <div className='add-user__filter-dropdown-body'>
                  <div className='add-user__filter-dropdown-field-wrapper'>
                    <p className='add-user__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='add-user__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='date' >Date</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                </div>
                <div className='add-user__filter-dropdown-footer'>
                  <p className='add-user__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='add-user__right-controls-wrapper'>
          <button className='add-user__insert' onClick={toggleAddModal}><i className="add-user__insert-icon fa-solid fa-plus"></i></button>
          {isAddModalOpen && <AddStaffModal onClick={toggleAddModal}/>}
        </div>
      </div>
      <div className='add-user__body'>
        <div className='add-user__table-wrapper'>
          <table className='add-user__table'>
            <thead>
              <tr>
                <th className='add-user__table-th'>Full Name</th>
                <th className='add-user__table-th'>Username</th>
                <th className='add-user__table-th'>Roles</th>
                <th className='add-user__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff =>
                  <tr className='add-user__table-tr' key={staff.id} >
                    <td className='add-user__table-td'>{staff.fullName}</td>
                    <td className='add-user__table-td'>{staff.username}</td>
                    <td className='add-user__table-td'>{staff.role}</td>
                    <td className='add-user__table-td'>
                      <UpdateIcon onClick={toggleEditModal}/>
                      <DeleteIcon onClick={() => {}}/>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && <EditStaffModal onClick={toggleEditModal}/>}
    </div>
  )
}

export default AddUser
