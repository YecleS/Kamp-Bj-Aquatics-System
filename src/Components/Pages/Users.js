import React, {useRef, useState, useEffect} from 'react';
import '../Styles/Users.css';
import ConfirmationMessageModal from '../UIComponents/ConfirmationMessageModal';
import ButtonComponent from '../UIComponents/ButtonComponent';

const Users = () => {
  const[isFilterDropdownOpen, isSetFilterDropdownOpen] = useState(false)
  const[isAddModalOpen, isSetAddModalOpen] = useState(false)
  const[isEditModalOpen, isSetEditModalOpen] = useState(false)
  const[isConfirmationModalOpen, isSetConfirmationModalOpen] = useState(false)
  const filterDropdownRef = useRef(null)

  //Initial Values For Filters Store In useState
  const[filters, setFilters] = useState({
    filterBy: '',
  })


  // Toggle Dropdowns
  const toggleFilterDropdown = () => {
    isSetFilterDropdownOpen(!isFilterDropdownOpen);
  }

  const toggleConfirmationModal = () => {
    isSetConfirmationModalOpen(!isConfirmationModalOpen)
}

  // Dummy Data For Table 
  const staffData = [
    {id: 1, name:'steven yecla', username:'stevenyandre', age: 22, email:'stevenyecla@gmail.com', gender:'M', address:'Blk 2 Lot 31 Mahogany Phase 2 San Isidro Cabuyao Laguna', approval:'approved'},
    {id: 2, name:'mico mics', username:'stevenyandre', age: 22, email:'stevenyecla@gmail.com', gender:'M', address:'Blk 2 Lot 31 Mahogany Phase 2 San Isidro Cabuyao Laguna', approval:'approved'},
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

  const proceed = () => {
    console.log('REVOKE');
  }

  return (
    <div className='users'>
      <div className='users__header'>
        <div className='users__left-controls-wrapper'>
          <div className='users__search-wrapper'>
            <input type='text' placeholder='Search' className='users__input-field'/>
          </div>
          <div className='users__filter-wrapper' ref={filterDropdownRef}>
            <i className="users__filter-icon fa-solid fa-filter" onClick={toggleFilterDropdown}></i>
            {isFilterDropdownOpen &&
              <div className='users__filter-dropdown'>
                <div className='users__filter-dropdown-body'>
                  <div className='users__filter-dropdown-field-wrapper'>
                    <p className='users__filter-label'>Filter by</p>
                    <select value={filters.filterBy} 
                      onChange={(e) => setFilters({ ...filters, filterBy: e.target.value })} 
                      className='users__filter-field'
                    >
                      <option></option>
                      <option value='name' >Name</option>
                      <option value='date' >Date</option>
                      <option value='price' >Price</option>
                    </select>
                  </div>
                </div>
                <div className='users__filter-dropdown-footer'>
                  <p className='users__filter-reset' onClick={resetFilters}>Reset Filters</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className='users__body'>
        <div className='users__table-wrapper'>
          <table className='users__table'>
            <thead>
              <tr>
                <th className='users__table-th'>Name</th>
                <th className='users__table-th'>Username</th>
                <th className='users__table-th'>Age</th>
                <th className='users__table-th'>Email</th>
                <th className='users__table-th'>Gender</th>
                <th className='users__table-th'>Address</th>
                <th className='users__table-th'>Approval</th>
                <th className='users__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff =>
                  <tr className='users__table-tr' key={staff.id} >
                    <td className='users__table-td'>{staff.name}</td>
                    <td className='users__table-td'>{staff.username}</td>
                    <td className='users__table-td'>{staff.age}</td>
                    <td className='users__table-td'>{staff.email}</td>
                    <td className='users__table-td'>{staff.gender}</td>
                    <td className='users__table-td'>{staff.address}</td>
                    <td className='users__table-td'>{staff.approval}</td>
                    <td className='users__table-td'>
                        <ButtonComponent buttonCustomClass='users__btn-approve' label='revoke' onClick={toggleConfirmationModal} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isConfirmationModalOpen && <ConfirmationMessageModal message='Are You Sure, You Want To Revoke This User ?' onClickProceed={proceed} onClickCancel={toggleConfirmationModal} />}
    </div>
  )
}

export default Users
